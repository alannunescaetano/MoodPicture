const pl = require("tau-prolog");
const session = pl.create(1000);

const program = `
:- use_module(library(lists)).

  threshold(calm, 3).
  threshold(angry, 2).

  dist(INPUT, AMP_MAX, AMP_AVG, HISTORY, STATE) :- threshold(INPUT, THRESHOLD), DIF is AMP_MAX - AMP_AVG, find_state(DIF, THRESHOLD, STATE_TMP), check_history(STATE_TMP, HISTORY, STATE).  
      
  find_state(DIF, THRESHOLD, stressed) :- DIF >= THRESHOLD. 
  find_state(DIF, THRESHOLD, not_stressed) :- DIF < THRESHOLD. 
      
  check_history(stressed, _, stressed).

  check_history(not_stressed, HISTORY, residual_stress) :- count_stressed(HISTORY, N), N > 3.

  check_history(not_stressed, HISTORY, residual_stress) :- last_3_consecutive_stressed(HISTORY).

  check_history(not_stressed, HISTORY, residual_stress) :- intermittent_stress(HISTORY).

  check_history(not_stressed, HISTORY, not_stressed) :- 
  count_stressed(HISTORY, N), N =< 3,
  \\\+ last_3_consecutive_stressed(HISTORY),
  \\\+ intermittent_stress(HISTORY).

  count_stressed([],0).
  count_stressed([H|Tail], N) :-
  count_stressed(Tail, N1),
  (  H = stressed
  -> N is N1 + 1
  ;  N = N1
  ).

  intermittent_stress([stressed, not_stressed, stressed, not_stressed, stressed]).
  intermittent_stress([stressed, not_stressed, stressed, residual_stress, stressed]).
  intermittent_stress([stressed, residual_stress, stressed, not_stressed, stressed]).
  intermittent_stress([stressed, residual_stress, stressed, residual_stress, stressed]).

  last_3_consecutive_stressed([stressed, stressed, stressed]).
  last_3_consecutive_stressed([_, stressed, stressed, stressed]).
  last_3_consecutive_stressed([_, _, stressed, stressed, stressed]).
`;

module.exports = {
    prepareSmartAgent: function() {
        session.consult(program);
    },

    processAllPeriods: async function(userMood, readings, callback) {
        
            var lastStressDefinitions = [];
            var results = [];
    
            for(let reading of readings) {
                await defineStressForPeriod(userMood, translateAmplitude(reading.MaxAmplitude), translateAmplitude(reading.AverageAmplitude), '['+lastStressDefinitions.toString()+']').then((stressDefinition) => {
                  if(lastStressDefinitions.length > 4) {
                    lastStressDefinitions.splice(0, 1);
                  }
                  
                  lastStressDefinitions.push(stressDefinition);
          
                  let result = { stress : stressDefinition, MaxAmplitude : reading.MaxAmplitude };
                  results.push(result);
          
                  if(results.length >= readings.length) {
                    callback(results);
                  }
                });
              }
    }
};

function defineStressForPeriod(userMood, maxAmplitude, avgAmplitude, lastResults) {
    return new Promise(resolve => {
        let goal = `dist(${userMood}, ${maxAmplitude}, ${avgAmplitude}, ${lastResults}, STATE).`;
        console.log('GOAL: '+ goal);

                session.query(goal, {
                    success: function(goal) {
                        session.answer({
                            success: function(answer) { 
                                console.log('ANSWER: '+ answer);
                                if(answer == "{STATE/stressed}"){
                                    resolve('stressed');
                                } else if(answer == "{STATE/residual_stress}") {
                                    resolve('residual_stress');
                                } else {
                                    resolve('not_stressed');
                                }
                             },
                            error:   function(err) { console.log('ERRO 1: '+err); },
                            fail:    function() { console.log('ANSWER: FAIL');},
                        })
                    },
                    error: function(err) { console.log('ERRO 2'); }
                })
    });
    
}

function translateAmplitude(amplitude) {
  
    if(amplitude <= 74) {
      return 1;
    } else if(amplitude >= 75 && amplitude <= 89) {
      return 2;
    } else if(amplitude >= 90 && amplitude <= 104) {
      return 3;
    } else if(amplitude >= 105 && amplitude <= 119) {
      return 4;
    } else if(amplitude >= 120) {
      return 5;
    }
  }