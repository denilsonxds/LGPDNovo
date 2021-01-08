(function(){
    // Functions
    function buildQuiz(){
      // variable to store the HTML output
      const output = [];
  
      // for each question...
      myQuestions.forEach(
        (currentQuestion, questionNumber) => {
  
          // variable to store the list of possible answers
          const answers = [];
  
          // and for each available answer...
          for(letter in currentQuestion.answers){
  
            // ...add an HTML radio button
            answers.push(
              `<label>
                <input type="radio" name="question${questionNumber}" value="${letter}">
                ${letter} :
                ${currentQuestion.answers[letter]}
              </label>`
            );
          }
  
          // add this question and its answers to the output
          output.push(
            `<div class="slide">
              <div class="question"> ${currentQuestion.question} </div>
              <div class="answers"> ${answers.join("")} </div>
            </div>`
          );
        }
      );
  
      // finally combine our output list into one string of HTML and put it on the page
      quizContainer.innerHTML = output.join('');
    }
  
    function showResults(){
  
      // gather answer containers from our quiz
      const answerContainers = quizContainer.querySelectorAll('.answers');
  
      // keep track of user's answers
      let numCorrect = 0;
  
      // for each question...
      myQuestions.forEach( (currentQuestion, questionNumber) => {
  
        // find selected answer
        const answerContainer = answerContainers[questionNumber];
        const selector = `input[name=question${questionNumber}]:checked`;
        const userAnswer = (answerContainer.querySelector(selector) || {}).value;
  
        // if answer is correct
        if(userAnswer === currentQuestion.correctAnswer){
          // add to the number of correct answers
          numCorrect++;
  
          // color the answers green
          answerContainers[questionNumber].style.color = 'green';
        }
        // if answer is wrong or blank
        else{
          // color the answers red
          answerContainers[questionNumber].style.color = 'red';
        }
      });
  
      // show number of correct answers out of total
      resultsContainer.innerHTML = `Corretas: ${numCorrect} de ${myQuestions.length}`;
    }
  
    function showSlide(n) {
      slides[currentSlide].classList.remove('active-slide');
      slides[n].classList.add('active-slide');
      currentSlide = n;
      if(currentSlide === 0){
        previousButton.style.display = 'none';
      }
      else{
        previousButton.style.display = 'inline-block';
      }
      if(currentSlide === slides.length-1){
        nextButton.style.display = 'none';
        submitButton.style.display = 'inline-block';
      }
      else{
        nextButton.style.display = 'inline-block';
        submitButton.style.display = 'none';
      }
    }
  
    function showNextSlide() {
      showSlide(currentSlide + 1);
    }
  
    function showPreviousSlide() {
      showSlide(currentSlide - 1);
    }
  
    // Variables
    const quizContainer = document.getElementById('quiz');
    const resultsContainer = document.getElementById('results');
    const submitButton = document.getElementById('submit');
    const myQuestions = [
      {
        question: "De acordo com o conteúdo deste manual, assinale a alternativa que contém o correto significado do que são dados.",
        answers: {
          a: "Um dado é qualquer particularidade de um objeto ou sistema que possa ser registrado em um meio físico ou virtual.",
          b: "Um dado é qualquer particularidade de um objeto ou sistema que possa ser registrado somente em um meio físico.",
          c: "Um dado é qualquer particularidade de um objeto ou sistema que possa ser registrado somente em um meio virtual.",
          d: "Um dado é qualquer particularidade de um objeto ou sistema que não possa ser registrado."
        },
        correctAnswer: "a"
      },
      {
        question: "O que são os dados e informações pessoais?",
        answers: {
          a: "São todos os dados e informações que não permitem a identificação de uma pessoa natural.",
          b: "São todos os dados e informações presentes em um dispositivo.",
          c: "São todos os dados e informações que facilitam ou permitem a identificação de uma pessoa natural.",
          d: "d.	É qualquer informação sobre um indivíduo, como: time ao qual se torce, jogo favorito, atleta favorito."

        },
        correctAnswer: "c"
      },
      {
        question: "Marque a alternativa que contém exemplos de dados pessoais:",
        answers: {
          a: "Time ao qual se torce, jogo favorito, atleta favorito.",
          b: "Nome, CPF, RG, Endereço.",
          c: "Nome de animal de estimação.",
          d: "Cor favorita."
        },
        correctAnswer: "b"
      },
      {
        question: "A proteção de dados pessoais é importante pois através dela é possível:",
        answers: {
          a: "Aumentar a insegurança que o usuário sente ao utilizar meios digitais ou contratar serviços físicos.",
          b: "Aumenta a vontade que o usuário sente ao navegar na internet.",
          c: "Contribui com o aumento do percentual de crimes virtuais. ",
          d: "Aumentar a segurança, a liberdade e a confiança que o usuário sente ao utilizar os meios digitais ou contratar serviços físicos."
        },
        correctAnswer: "d"
      },
      {
        question: "Os dados pessoais que os criminosos mais visam são:",
        answers: {
          a: "Somente o número de telefone.",
          b: "Nome, Data de nascimento, CPF, dados financeiros.",
          c: "Endereço residencial e de e-mail.",
          d: "Localização do GPS."
        },
        correctAnswer: "b"
      },
      {
        question: "O que são crimes virtuais?",
        answers: {
          a: "São todos aqueles crimes e delitos praticados por meio da internet ou de qualquer dispositivo informático, eles visam manipular ou roubar os dados de suas vítimas.",
          b: "São todos aqueles crimes e delitos praticados fisicamente, eles visam manipular ou roubar os dados de suas vítimas.",
          c: "São todos aqueles crimes e delitos praticados por meio da internet ou de qualquer dispositivo informático e físicos, eles visam manipular ou roubar os dados de suas vítimas.",
          d: "São todos aqueles crimes e delitos praticados por meio da internet ou de qualquer dispositivo informático, que não roubam nem manipulam dados."
        },
        correctAnswer: "a"
      },
      {
        question: "O que é a LGPD?",
        answers: {
          a: "A lei foi sancionada em 30 de novembro de 2012, tipificando como crime a invasão de um dispositivo informático qualquer com o intuito de obter, excluir ou alterar dados nele presentes, seja no armazenamento, interno, externo ou nuvem.",
          b: "Entrou em vigor em 18 de setembro de 2020, surgiu para suprir a falta de uma lei para regular a proteção e a privacidade dos dados, com o objetivo garantir as pessoas o direito à privacidade, segurança e o controle sobre seus dados pessoais.",
          c: "É uma lei que estabelece de maneira clara e objetiva os direitos, assim como, os deveres relativos à utilização dos meios digitais, como: Maneiras que o usuário e instituições devem se portar.",
          d: "Criado em 23 de abril de 2014, com o objetivo de estabelecer princípios para a utilização da internet no país, determinando os direitos e deveres dos usuários e das instituições que fornecem serviços virtuais, ou seja, qualquer serviço gratuito ou pago que seja ofertado online."
        },
        correctAnswer: "b"
      },
      {
        question: "O que são dados sensíveis?",
        answers: {
          a: "São dados que representam qualquer particularidade de um objeto ou sistema que possa ser registrado em um meio físico ou virtual.",
          b: "São todos os dados e informações que não permitem a identificação de uma pessoa natural.",
          c: "São dados que que podem levar a discriminação de uma pessoa, logo, recebem um tratamento diferenciado, esses dados são sobre convicções religiosas, origem racial ou étnica, opiniões políticas e vários outros que trataremos mais à frente.",
          d: "É qualquer informação sobre um indivíduo."
        },
        correctAnswer: "c"
      },
      {
        question: "Quais os princípios da LGPD?",
        answers: {
          a: "Finalidade, Adequação, Necessidade, Livre Acesso, Qualidade dos Dados, Transparência, Segurança, Prevenção, Não Descriminação, Responsabilização.",
          b: "Transparência, Segurança, Prevenção.",
          c: "Segurança.",
          d: "Proteção de Dados e Segurança."
        },
        correctAnswer: "a"
      },
      {
        question: "Quais os direitos dos titulares segundo a LGPD?",
        answers: {
          a: "Responsabilidade dos Agentes de Tratamento, Direito à revisão de decisões automatizadas, Direito à Não-Discriminação, Direito à Retificação.",
          b: "Responsabilidade dos Agentes de Tratamento, Direito à revisão de decisões automatizadas, Direito à Não-Discriminação, Direito à Retificação, Anonimização.",
          c: "Autoridade sobre seus Dados Pessoais, Consentimento para o tratamento de dados pessoais, Direito a Informação, Direito ao Livre Acesso, Direito a segurança dos Dados Pessoais, Responsabilidade dos Agentes de Tratamento, Direito à revisão de decisões automatizadas, Direito à Não-Discriminação, Direito à Retificação, Anonimização, Eliminação ou Bloqueio dos Dados Pessoais, Direito à Portabilidade dos Dados.",
          d: "Autoridade sobre seus Dados Pessoais."
        },
        correctAnswer: "c"
      },
    ];
  
    // Kick things off
    buildQuiz();
  
    // Pagination
    const previousButton = document.getElementById("previous");
    const nextButton = document.getElementById("next");
    const slides = document.querySelectorAll(".slide");
    let currentSlide = 0;
  
    // Show the first slide
    showSlide(currentSlide);
  
    // Event listeners
    submitButton.addEventListener('click', showResults);
    previousButton.addEventListener("click", showPreviousSlide);
    nextButton.addEventListener("click", showNextSlide);
  })();
  