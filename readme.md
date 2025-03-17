### About

Hello:)
this the code for my website
https://kernjosh.com

Im a total noob when it comes to writing code. I get along with html and css but I just started to learn JavaScript one year ago. Most of the time I have no idea what Im writing.

I also just started using GitHub and still dont really understand it.

### About the Website

My website kind of works right now... but most of the time its very heavy for the browser because of all the visiul changes that happen all the time and because I have a lot of JavaScript... I just dont know how to make it more efficient.

It only works on desktop and Im fine with that. It also only works in Chrome and kind of in Firefox. In Safari for example its lagging the whole time. Would be nice if it would run smoothly in all browsers someday...

### Contributing

If you find any bugs or have an idea on how I can make it run more smoothly follow one of these two steps: (thank youu)

### 1. Reporting Issues

Open an issue in the [mywebsite](https://github.com/kjoshh/mywebsite) repository on GitHub. Please add steps to reproduce the issue and relevant error messages. Thank youu.

### 2. Contributing Code

1.  **Fork the `mywebsite` repository:** Click the "Fork" button at the top right of the [mywebsite](https://github.com/kjoshh/mywebsite) repository. This will create a copy of the repository in your own GitHub account.

2.  **Clone your fork:**

    ```bash
    git clone https://github.com/kjoshh/mywebsite.git
    cd mywebsite
    ```

3.  **Create a new branch:** Give your branch a name related to the issue or whatever you're working on.

    ```bash
    git checkout -b fix/example-name
    ```

4.  **Make your changes:** Edit the files in your local repository to fix the bug or whatever.

5.  **Test your changes:** You'll need to build the project locally to test your changes. See the "Building the Project for Testing" section below.

5.1 Or use

    ```bash
    npm run dev
    ```

to check your changes in the browser. Its faster. But you also need to check your changes after its built. Sometimes the final build behaves differently than with "run dev". I dont know why :))

6.  **Commit your changes:** Use descriptive commit messages.

    ```bash
    git add .
    git commit -m "Descriptive commit"
    ```

7.  **Push your changes to your fork:**

    ```bash
    git push origin fix/example-name
    ```

8.  **Create a pull request:** Go to the [mywebsite](https://github.com/kjoshh/mywebsite) repository on GitHub and click the "Create pull request" button. Make sure your pull request is based on the `main` branch and that it includes a description of the changes you've made.

### Building the Project for Testing

To finally test your changes locally, you'll need to build the project.

1.  Make sure you have Node.js and npm (or yarn) installed.

2.  Run:

    ```bash
    npm install
    ```

3.  Run:

    ```bash
    npm run build
    ```

    This will create a `dist` folder containing the built website.

### Note

- My `dist` folder (containing the built website) is in a separate repository [newhostedsite](https://github.com/kjoshh/newhostedsite).
