class Sock {
  constructor(url, model) {
    this.ws = new WebSocket(url);
    this.ws.onopen = this.onopen;
    this.ws.onmessage = this.onmessage;
    this.ws.onclose = this.onclose;
    this.ws.onerror = this.onerror;
  }

  onopen(d) {
    console.log(d)
  }

  onmessage(msg) {
    // console.log(msg)
    let d = JSON.parse(msg.data);
    console.log(d);
    // if(msg.data.type != 'enclosure.mouth.viseme') {
    // console.log(msg.data);
    // }
    	if(d.type == 'recognizer_loop:record_begin')
        model.enter();
    // 		$disp.append('<br/>character enter into the view');
    	if(d.type == 'enclosure.mouth.think')
        model.fadeAction('idle', 'think');
      if(d.type == 'enclosure.notify.no_internet' || d.type == 'mycroft.speech.recognition.unknown' || d.type == 'recognizer_loop:audio_output_end')
        model.leave();
      //'mycroft.speech.recognition.unknown'
    // 		$disp.append('<br/>character thinks');
    	// if(d.type == 'enclosure.mouth.viseme')
        // modelfadeAction('think', 'swipe')
    // 		$disp.append('<br/>character speaks');
    // 	if(d.type == 'recognizer_loop:audio_output_end')
    // 		$disp.append('<br/>character hides from the view');
  }

  onclose(d) {
    console.log(d);
  }

  onerror(d) {
    console.log(d);
  }
}
