# Playwright Async Benchmark 

## The Story Behind this Repo
So this repo was created for a certain someone (who will remain anonymous) made [this amazingly ignorant comment](https://github.com/microsoft/playwright/issues/37062#issuecomment-3193733984).\
After I was in shock for a bit, I complained to the [PW discord server](https://discord.com/channels/807756831384403968/1405813451179294731). People there suggested to create a benchmark checking my statement. \
So here we are, me proving to this anonymous person that he is wrong in the hopes of making Playwright faster and better.

## The Project
The tests run on a simple express server located in `src/server`. It does some fake async work to imitate a real server.

Each test is ran 5 times (in every benchmark), just so I wouldn't need to be creative and run a lot of tests. 

## Results
Not surprising really\
on my machine, an Ubuntu with the specs:
```
OS: Ubuntu 24.04.3 LTS x86_64
Host: 20L6S0CG09 ThinkPad T480
Kernel: 6.14.0-28-generic
Uptime: 56 mins
Packages: 2481 (dpkg), 17 (flatpak), 20 (snap)
Shell: bash 5.2.21
Resolution: 1920x1080
DE: GNOME 46.0
WM: Mutter
WM Theme: Adwaita
Theme: Yaru-sage-dark [GTK2/3]
Icons: Yaru-sage [GTK2/3]
Terminal: zellij
CPU: Intel i5-8350U (8) @ 3.600GHz
GPU: Intel UHD Graphics 620
Memory: 2988MiB / 39991MiB
```
```
```
For context.

To run the benchmark yourself run `./run-all.sh >| file-of-your-choosing.txt`.
It will set there the raw output from playwright.

### Kinds of Benchmarks
There is a benchmark test with only one worker running all of the tests _concurrently_ (this is the file `async-runner.spec.ts`).\
Originally I wanted to have a test with 2 workers each running their tests concurrently, but I saw it wasn't necessary
as the results are just astounding.

There is also benchmarks for running the tests with every of the following worker counts 
1, 2, 3, 4, 5, 6, 7, 8, 16, 32, 45. \
It stops at `45` as there are a total of `45` tests.

This is a joke on the comment he made, obviously it is stupid to run `45` workers on a machine like my own with only `8` threads.\
But I did it anyway just to prove a point (RIP my computer lol)

### Graphs
On my Ubuntu: \
![ubuntu-chrome-all](./images/ubuntu-chrome-all.png) \
You can see that not only that the async-runner (that runs with 1 worker) is much faster then the best PW has to offer.\
There is also a regression when you try to run more workers (as expected)

But this doesn't do much for me, So I run it with a multiplier of 20 (instead of 5, you can change it in `src/all-tests.ts`), totaling in 180 tests. \
And as it seems that the best workers number on my machine is 6, I stuck with it. \
This is what the script `run-best.sh` is for. Notice that the difference between the 2 asyncs here is that 1 runs with 2 workers \ 
![ubuntu-chrome-best](./images/ubuntu-chrome-best.png) \
You can see that even with 1 worker we gained 300% increase.

## What Now?
This gain can only be if the tests are waiting for things to happen, and not doing the hard computation on their own. \
As this is the case of most website's tests I believe it should be a feature in PlayWright, to make it easier for the developers to gain this performance. \
As I said in my [first issue](https://github.com/microsoft/playwright/issues/36900), this should not be the default
behaviour of PlayWright. \
But it can be configurable in `playwright.config.ts` for example, maybe even use something like `p-limit` and allow to
limit the amount of concurrency per worker... Just a thought.


