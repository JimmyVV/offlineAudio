/*global audioLib, FileReader, console */
/*jshint unused:false, onevar:false, debug:true, browser:true */
var fft;
var context;
var length = 82000*900;
var samplerate = 44100;
var fftSamples = 2048;
var processAudio;
var context;
var source;
var processor;

context = new webkitOfflineAudioContext(1, length, samplerate);
    // context = new webkitAudioContext();
    source = context.createBufferSource();
    processor = context.createScriptProcessor(fftSamples,1, 1);

fetch('/src/assets/run.mp3')
.then(decodeAudio);


var decodeAudio = function(file) {
  console.log("Creating buffer...");
  context.decodeAudioData(buffer, processBuffer, function(err) { console.log(err);});
};

function processBuffer(buffer) {
    fft = context.createAnalyser();
    fft.fftSize = fftSamples;

    source.buffer = buffer;
    source.connect(fft);
    fft.connect(processor);
    processor.connect(context.destination);
    processor.onaudioprocess = processAudio;

    console.log("starting");
    source.start(0);
    context.startRendering();

}

var counter = 0;
processAudio = function (e) {
  counter++;
  console.log(counter);
};
