
## PSSH Extractor

https://pssh-extractor.vercel.app

This is an open-source website where you can quickly extract the Protection System Specific Header (PSSH) by using the initialization file. There are generally 2 PSSH extracted. Widevine and Playready. You can go to Axinom and validate your PSSH. This site is for educational purposes only and does not guarantee anything.

Built with Next.js and Tailwind CSS and deployed to Vercel.



## Frequently Asked Questions

### How does this work, any limitations ?

File reading and calculations are done in your browser. So there's no interaction with any server. There's only one limitation. Your file should be under 1MB, generally initialization files are 2-3 KB, so you should be fine. However, if you come across anything different, please create an issue. 

### What does this mean `Failed to extract PSSH from your file` ?

It's possible that you've passed an invalid file. Make sure you use the initialization file. If this error still occurs, feel free to create an issue.

### Why ?

Why not ?



## TODO

- Add tests

- Add a feature to determine PSSH's type (Widevine, Playready)
