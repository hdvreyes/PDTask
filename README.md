# Master Detail - First part of the task

Master detail for PipeDrive's contact, deals and activities API.

## Getting Started

To get started please clone or download this repo and run npm install for dependencies.

![](details.gif)
![](person_list.gif)

### Prerequisites

This project is built on React-Native. Kindly head over to the React-Native website for installation. You will also need the following:

```
XCode
Android Studio
```

Dependencies (please see package.json):
```
react: 16.8.6
react-native: 0.60.5
redux: 4.0.4
react-redux: 7.1.1
redux-thunk: 2.3.0
Wix's react-native-navigation: 3.1.2
```

### Project notes:
* Persons sample size is set only to 100
* The first 5 persons have Deals and Activities set the other none.
* Pagination occurs on the Main list, reaching the end of the list will auto paginate this works both online and offline.
* For offline storage I've implemented React-Native's AsyncStorage to avoid further dependencies
* Redux is used for fetching records
* Person detials is limited to display only to 3 activities and deals
* Call action on the Person's phone should trigger native dialer.(Not fully tested - simulator limitations)

# Theory - Second part of the task

1. How would you deal with 10s or 100s of thousands of different objects to synchronise with offline storage? What are the main difficulties?
One approach we can do is to decouple the UI with the background services. We can use threading/async methods such redux to collect the necessary date in the background.
Doing so will ensure responsive of our UI. It can an add complexities to our project, but it's a necessary complexities in my humble opinion. After this we can weigh in the storage library to use. Are we going to use react native's AsyncStorage, is it sufficient for our needs, is it reliable and fast or we can us third party library such Realm. Ultimately, we need to weigh in on our choices.

2. How would you optimise a list which hosts lots of different items with complicated UI and clearly stutters when scrolling? Elaborate on your decisions.
We can simplify the UI, refactor it in such a way we can remove the complication. We can implement a pagination method to avoid loading all items at once. 
We can do an async or threaded approach in collecting data, from displaying data. By doing such segragation and delegation of tasks we can ensure responsiveness of our UI.

3. Imagine that you are developing multi-language app that supports 40 languages. Describe how you will:
Design UI to be responsive to language change.
Organise translation file managing and coordination between app and translators.
Test localisation quality. 
What other possible difficulties you can imagine to be present in this situation?

In all honesty I haven't had the chance in implementing massive localisation for mobile. At the moment I can't provide a sound answer to this question. But I do welcome the opportunity and challenge in working with such task.

4. How could you prevent features in release builds breaking live releases and how could you react to this, when it happens?

A  good practice would be to develop short lived featurse which starts and terminates from the main release. Doing so we can isolate problems and regressions easily. Always have test, if a TDD approach can't be employed which is in most cases happens. At least have a significant amount of tests to cover paramount scenarios. Proper tagging of release is also a must, doing so can provides us with a method of rolling back.

5. Describe potential solutions, pros and cons of different navigation approaches in react native project.
There are two popular navigation solutions for react native, wix-react-native-navigation and react-navigation. Wix's react native navigation provides 100% native platform navigation, based on my usage experience it's fast and realible. However, intregation can be complicated. There's a significant amount configuration changes to be implemented which can be overwhelming for developers who doesn't have experience in objective-c or java. On the other hand react navigation is completely written in javascript. Developers comfortable using javascript can find this library to highly customizable. The downside to this, is that the UI, from transition to animation can suffer minor slow down.
