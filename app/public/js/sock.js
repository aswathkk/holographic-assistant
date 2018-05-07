class Sock {
  constructor(url) {
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
    let d = JSON.parse(msg);
    console.log(d);
    // if(msg.data.type != 'enclosure.mouth.viseme') {
    // console.log(msg.data);
    // }
    // 	if(d.type == 'recognizer_loop:record_begin')
    // 		$disp.append('<br/>character enter into the view');
    // 	if(d.type == 'recognizer_loop:record_end')
    // 		$disp.append('<br/>character thinks');
    // 	if(d.type == 'enclosure.mouth.viseme')
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
