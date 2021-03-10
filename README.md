# GainChanger

<a href="https://github.com/jpoist97" target="_blank"><img src="https://media.giphy.com/media/vFTbteaIQFVNG8H9ux/giphy.gif" width="200" /></a>

## Installing the app

This app is optimized for iPhone X and later, but will run smoothly on all IOS devices.
You can download Gainchanger with this link (insert link here)

## Overview
Gainchanger is a student project thats main motivation was to create a product that we would use. During this time, we noticed that the workout apps that already exist were cramped, costly, and hard to use. After weeks of user-research, planning, prototyping and competitor analysis; we set out to improve the workout app experience and create the best workout app on the market. With that goal in mind, we created an easy to use app allows for users to create workouts, combine these workouts into cycles, view their workout history, access graphs that show overall progress, and a bunch of other features. 

### Vision Statement
We strive to help gym-goers and athletes plan, organize, and track their workouts so that they can easily see their progress and motivate them to reach new personal records!

### Meet the Team

<p float="left">
  <a href="https://github.com/jpoist97" target="_blank"><img src="https://avatars3.githubusercontent.com/u/42504462?s=460&u=fbe279fd5e77ba14a01b2679da9970e49f5a989e&v=4" width="150" /></a>
  <a href="https://github.com/ctperry0301" target="_blank"><img src="https://avatars3.githubusercontent.com/u/15805074?s=400&u=c2a0e7ef773958b28ce01ae19dcdbb1eefcce015&v=4" width="150" /></a>
  <a href="https://github.com/finlaylp" target="_blank"><img src="https://avatars.githubusercontent.com/u/47064384?s=400&u=c1701deeb1fb86a8c52a5b102824a4bbbafe748a&v=4" width="150" /></a>
  <a href="https://github.com/rohithdara" target="_blank"><img src="https://avatars.githubusercontent.com/u/46057294?s=400&u=b6b073d48f688032d641f2c2d4db922c3a9f62d8&v=4" width="150" /></a>
  <a href="https://github.com/shriyan44" target="_blank"><img src="https://avatars.githubusercontent.com/u/29551904?s=400&u=6021a76d56832083a025c11878c9ae65dbf8389c&v=4" width="150" /></a>
</p>

(From left to right)
- Justin Poist
- Cole Perry
- Finlay Piroth 
- Rohith Dara
- Shriya Nimmagadda


## Set-up Instructions
### Setting up the Development Environment
1. Clone the repository with ``` git clone https://github.com/jpoist97/GainChanger.git ```
2. Navigate to the projects root
3. Run ```npm i``` (to install all of the project dependencies)
4. Install the Expo Go app on your phone. 
5. Run ```npm start```

### Setting up the Testing Environment
1. Navigate to the projects root
2. Run ```npm test``` to test the enitre codebase
3. Run ```npm test fileName``` to test a single file


### Style Guide
[Airbnb Javascript Style Guide](https://github.com/airbnb/javascript)

### Static Code Analysis Report 
https://sonarcloud.io/dashboard?id=jpoist97_GainChanger

Although we were able to remove all bugs from our repository, we were unable to address all of the code smells. Some of the code smells directly conflicted with the way that redux reducers must be structured, meaning fixing those code smells would break our redux store. Some other code smells would require a large refactoring of code to fix, which we didn't want to do so close to the end of our project in fear of introducing new bugs to our code. Several of our other code smells also came from TODO comments we left in our code to keep track of features we have yet to complete. Looking towards the future, we definitely anticipate being able to get the number of code smells in our repository down, but as is, our code base is already really healthy.

### Unit Test Location
https://github.com/jpoist97/GainChanger/tree/main/__tests__

<a href="https://ibb.co/kBWydwK"><img src="https://i.ibb.co/JtMdhGn/Screen-Shot-2021-03-10-at-11-14-15-AM.png" alt="Screen-Shot-2021-03-10-at-11-14-15-AM" width="400" border="0" /></a>

### User Testing
Link to Form: https://forms.gle/evdC6h7fqdb1MNBL7

Link to Analysis: https://tinyurl.com/gainchangerusertesting

### Continuous Integration 
https://www.travis-ci.com/github/jpoist97/GainChanger
