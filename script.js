let btn = document.querySelector("#btn")
let content = document.querySelector("#content")
let voice = document.querySelector("#voice")

function speak(text) {
    let test = new SpeechSynthesisUtterance(text)
    test.rate = 1
    test.pitch = 0.3
    test.volume = 1
    test.lang = "EN-GB"
    window.speechSynthesis.speak(test)
}

function wishMe() {
    let day = new Date()
    let hours = day.getHours()
    if (hours >= 0 && hours < 12) {
        speak("Good Morning Sir")
    }
    else if (hours >= 12 && hours < 16) {
        speak("Good Afternoon sir")
    }
    else {
        speak("Good Evening sir")
    }
}
window.addEventListener("load", () => {
    wishMe()
})

let speechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
let recognition = new speechRecognition()
recognition.onresult = (event) => {
    let currentIndex = event.resultIndex
    let transcript = event.results[currentIndex][0].transcript
    content.innerText = transcript
    takeCommand(transcript.toLowerCase())
}

btn.addEventListener("click", () => {
    recognition.start()
    btn.style.display = "none"
    voice.style.display = "block"
})
function takeCommand(message) {
    btn.style.display = "flex"
    voice.style.display = "none"
    if (message.includes("hello") || message.includes("hey") || message.includes("jarvis")) {
        speak("Hello sir , how can i help you")
    }
    else if (message.includes("who are you")) {
        speak("i am jarvis your personal virtual assistant")
    }
    else if (message.includes("open youtube")) {
        speak("opening youtube")
        window.open("https://www.google.com")
    }
    else if (message.includes("open calculator")) {
        speak("opening calculator")
        window.open("calculator://")
    }
    else if (message.includes("time")) {
        let time = new Date().toLocaleString(undefined, { hour: "numeric", minute: "numeric" })
        speak(time)
    }
    else if (message.includes("date")) {
        let date = new Date().toLocaleString(undefined, { day: "numeric", month: "short", year: "numeric" })
        speak(date)
    }
    else {
        let finalText = "this is what i found on internet regarding" + message.replace("pekka", "") || message.replace("pekka", "")
        speak(finalText)
        window.open(`https:www.google.com/search?q=${message.replace("shipra", "")}`, "blank")
    }
}