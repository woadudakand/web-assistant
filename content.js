// const colorPickerBtn = document.querySelector("#color-picker");
var messageEl = document.createElement('div');
messageEl.classList.add('messagesp');
messageEl.style.position = 'fixed';
messageEl.style.bottom = '10px';
messageEl.style.right = '10px';
messageEl.style.zIndex = 99999999999;
messageEl.style.padding = '5px';
messageEl.style.minWidth = '30px';
messageEl.style.backgroundColor = 'black';
messageEl.style.color = 'white';
messageEl.style.borderRadius = '3px';
let textarea = document.activeElement;

document.body.addEventListener('click', (event) => {
  if(event.target.tagName === 'TEXTAREA' || event.target.tagName === 'INPUT' || event.target.tagName === 'input') {
    textarea = event.target
  }
  
})

document.body.appendChild(messageEl);

function runAssistant () {
        let message = document.querySelector('.messagesp');

        let recognization = new webkitSpeechRecognition();
        let activeAi = false;
        let markUpEdit = false;
        let element = null;
        let preSign = null;
        // recognization.lang = 'bn';
        

        recognization.start();

        recognization.onresult = (event) => {

          const speech = event.results[0][0].transcript.trim();          
          
          if (speech.trim() === 'hello assistant') {
            message.innerHTML = 'I am ready for work';
            activeAi = true;    
            return;       
          }

          if(activeAi) {
            if(speech === 'write Bangla'){
              recognization.lang = 'bn';
              message.innerHTML = 'Write Bangla';
              return;
            }

            if(speech === 'ইংলিশ লিখ'){
              recognization.lang = 'en';
              message.innerHTML = 'Write English';
              return;
            }
            
            
            if(speech === 'HTML edit') {
              message.innerHTML = 'markup edit';              
              markUpEdit = true;
              return;
            }

            if(speech === 'edit clear') {
              message.innerHTML = 'markup edit clear';              
              markUpEdit = false;
              return;
            }

            if(markUpEdit) {
              preSign = speech.startsWith('class select') ? '.' : speech.startsWith('id select') ? '#' : speech.startsWith('element select') ? '' : 'none selection';
              
              if(preSign !== 'none selection') {
                element = document.querySelector(`${preSign}${speech.split('select')[1].trim()}`);                
                message.innerHTML = color;
                return;
              }

              if(element) {
                let isStyle = speech.startsWith('style');                
                if(isStyle) {
                  
                  switch(speech.split(' ')[1].trim()){
                   
                    case 'background':
                      return element.style.backgroundColor = speech.split(' ')[2];
                    case 'colour':
                      return element.style.color = speech.split(' ')[2];
                      
                      case 'with':
                      return element.style.width = Number(speech.split(' ')[2]) ?  Number(speech.split(' ')[2])  + px : speech.split(' ')[2];

                        default:
                          console.log(speech.split(' ')[1].trim(), speech.split(speech.split(' ')[1].trim())[1].trim())
                        element.style[speech.split(' ')[1].trim()] = speech.split(speech.split(' ')[1].trim())[1].trim();


                  }
                  return;
                }
              } else {
                message.innerHTML = 'no element';
                return;
              }
            }

            if(speech === 'scroll top' && !markUpEdit) {
              message.innerHTML = 'page top';              
              window.scrollTo(0, 0);
              return;
            }

            if(speech === 'scroll bottom' && !markUpEdit) {
              message.innerHTML = 'page bottom';              
              window.scrollTo(0, document.body.clientHeight);
              return;
            }

            if(speech === 'scroll down' && !markUpEdit) {
              message.innerHTML = 'scroll down';              
              window.scrollTo(0, window.scrollY + 100);
              return;
            }

            if(speech === 'scroll up' && !markUpEdit) {
              message.innerHTML = 'scroll up';              
              window.scrollTo(0, window.scrollY - 100);
              return;
            }

            if(speech.startsWith('click') && !markUpEdit) {                
                message.innerHTML = 'ready for click';              
                let element = document.querySelector(`*[data-action="${speech.split('on ')[1].trim()}"]`);
                element ? element.click() : message.innerHTML = `No ${speech.split('on ')[1]} Element`;               
                return; 
            }

            if(speech.startsWith('go back') && !markUpEdit) {                
                window.history.go(-1);
                return;
            }

            if(speech.startsWith('go next') && !markUpEdit) {                
                window.history.go(+1);
                return;
            }

            if(speech.startsWith('window reload') && !markUpEdit) {
                window.location.reload();
                return;
            }

            if(speech.startsWith('alert ok') && !markUpEdit) {
               
                function simulateKeyPress(key) {
                    const event = new KeyboardEvent('keydown', { key });
                    document.dispatchEvent(event);
                }

                simulateKeyPress(8)
                  
            }

            if (speech === 'assistant go to sleep') {              
              activeAi = false;
              message.innerHTML = 'stop recognition';
              return;
            }

            if(textarea){  
              if(speech === 'clear' || speech === 'ক্লিয়ার') {
                textarea.value = '';
                return
              }

              if(textarea.tagName === 'INPUT' || textarea.tagName === 'input'){
                textarea.value = speech; 
                return;
              } else {
                textarea.value = textarea.value + speech +". "; 
                return;
              }
            }

          }
        };


      recognization.onend = (event) => {
        recognization.start();
      };
}

runAssistant();

