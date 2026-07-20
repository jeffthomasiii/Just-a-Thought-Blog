# Audio Companion front matter

Posts use browser narration by default. No additional front matter is required.

## Disable audio for a post

```yaml
audio_enabled: false
```

## Add a recorded audio companion

Place the audio file in the repository, then add its site-relative path:

```yaml
audio_file: /audio/posts/example-reflection.mp3
audio_duration: "8 min"
```

When `audio_file` is present:

- the post-level Audio Companion plays the recording instead of browser narration;
- the Listen page plays the same recording through its shared controls;
- the library card is labeled **Recorded**;
- the Voice selector is hidden because recorded audio does not use browser voices;
- the Speed control adjusts recorded playback speed.

When `audio_file` is omitted, the existing browser-narration experience remains unchanged.

## Recommended file conventions

- Store post recordings under `/audio/posts/`.
- Use lowercase, hyphenated filenames that match the post slug.
- Prefer MP3 for broad browser compatibility.
- Keep `audio_duration` short and reader-facing, such as `"6 min"` or `"12:34"`.
