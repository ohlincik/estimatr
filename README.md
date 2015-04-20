# Estimatr

This is a simple app to demonstrate how to build a Single Page Application (SPA) using
Angular JS and Parse. The app served as the main focus of a workshop presented at the
[Erie Day of Code 2015](http://eriedayofcode.com)

# Running the app

First, you'll need to clone the app to your machine.

```
git clone https://github.com/ohlincik/estimatr.git
cd estimatr
```

Then, you have 2 options to play with the app.

## Without running a server

Navigate to your app directory and unzip the *bower_components*

```
cd app
unzip bower_components.zip
```

If that does not work for you, you may need to navigate to the app directory and unzip the file
using the OS utility.

Then, simply open the `estimatr/app/index.html` in your browser.

## With running a server

The initial AngularJS setup is actually based on the **angular-seed** application skeleton
provided by the AngjularJS development team.

Read and follow the instuctions on the [angular-seed](https://github.com/angular/angular-seed)
GitHub page to learn more and to install the dependencies and ultimately run the app through a
local server.

# Estimatr development process steps

To best understand why and how this app was developed, take a look at the [Slideshow](http://bit.ly/1D5Va40).

Then, use specific **git tags** to transport you into particular spots along the development timeline.

### STEP 0 - Pristine AngularJS Setup

`git checkout step-0`

### STEP 1 - Bootstrapped initial app

`git checkout step-1` | [git-diff](http://bit.ly/1aLd1GV)

### STEP 2 - Add the seed quote

`git checkout step-2` | [git-diff](http://bit.ly/1Gb6QXV)

### STEP 3 - Add calculations

`git checkout step-3` | [git-diff](http://bit.ly/1IxQYij)

### STEP 4 - Add items management

`git checkout step-4` | [git-diff](http://bit.ly/1D7yvFM)

### STEP 5 - Add sections management

`git checkout step-5` | [git-diff](http://bit.ly/1yK6GH1)

### STEP 6 - Refactor section calculations

`git checkout step-6` | [git-diff](http://bit.ly/1bdNc2L)

### STEP 7 - Add project calculations

`git checkout step-7` | [git-diff](http://bit.ly/1JZD8qb)

### STEP 8 - Improve the UI

`git checkout step-8` | [git-diff](http://bit.ly/1DtUvtM)

### STEP 9 - Add the Quote Service

`git checkout step-9` | [git-diff](http://bit.ly/1JmLZRN)
