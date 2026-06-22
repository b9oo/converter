const output = document.getElementById("output");
const button = document.getElementById("convertBtn");

button.addEventListener("click", convert);

async function convert() {
const fileInput = document.getElementById("videoFile");

```
if (!fileInput.files.length) {
    output.textContent = "Please select an MP4 file.";
    return;
}

output.textContent = "Loading FFmpeg...";

const { FFmpeg } = FFmpegWASM;
const ffmpeg = new FFmpeg();

await ffmpeg.load();

const file = fileInput.files[0];

output.textContent = "Reading MP4...";

const data = new Uint8Array(await file.arrayBuffer());

await ffmpeg.writeFile("input.mp4", data);

output.textContent = "Extracting audio...";

await ffmpeg.exec([
    "-i",
    "input.mp4",
    "-vn",
    "-acodec",
    "pcm_s16le",
    "-ar",
    "44100",
    "-ac",
    "1",
    "audio.wav"
]);

const wav = await ffmpeg.readFile("audio.wav");

output.textContent =
    "Audio extracted successfully.\n\n" +
    "Next step: Analyze WAV and convert notes to MakeCode format.\n" +
    `Extracted WAV size: ${wav.length} bytes`;
```

}
