let current = 0
const picks = {}

const questions = [
  {
    question: "What do you want to do tonight? 🫣",
    answers: ["Stay out 💅", "Stay in 🧖‍♀️", "BOTH 😤"],
    values: ["go out", "stay in", "go out then come back"],
    category: "vibe"
  },
  {
    question: "Dinner options 👩‍🌾",
    answers: ["we going FANCY 🍱", "Easy food 🍔", "15lbs of bananas 🍌", "ME???🫦"],
    values: ["somewhere fancy", "something easy", "whatever's in the kitchen", "skip dinner 🫦"],
    multiSelect: true,
    category: "dinner"
  },
  {
    question: "Activity? 🗽",
    answers: ["Movie 🍿", "Let's talk 🙊", "netflix and chill 🫨"],
    values: ["watch a movie", "actually talk for once", "netflix and chill"],
    multiSelect: true,
    category: "activity"
  },
  {
    question: "Vibe check 👾",
    answers: ["Chill & Cozy 🍃", "Titanic type shit ⛴️", "IDK I haven't figured out my life yet 🗯️"],
    values: ["chill and cozy", "make it a whole moment", "wherever the night takes us"],
    category: "energy"
  }
]

function showQuestion() {
  if (current >= questions.length) {
    document.getElementById("question").textContent = "one sec generating our plan... ✨"
    document.getElementById("answers").innerHTML = ""
    setTimeout(() => { makePlan() }, 2000)
    return
  }
  document.getElementById("answers").innerHTML = ""
  const q = questions[current]
  document.getElementById("question").textContent = q.question
  q.answers.forEach((answer, index) => {
    const btn = document.createElement("button")
    btn.textContent = answer
    btn.addEventListener("click", () => {
      if (!q.multiSelect) {
        picks[q.category] = q.values[index]
        btn.classList.add("selected")
        setTimeout(() => {
          current++
          showQuestion()
        }, 300)
      } else {
        btn.classList.toggle("selected")
        if (!picks[q.category]) picks[q.category] = []
        if (btn.classList.contains("selected")) {
          picks[q.category].push(q.values[index])
        } else {
          picks[q.category] = picks[q.category].filter(v => v !== q.values[index])
        }
      }
    })
    document.getElementById("answers").appendChild(btn)
  })
  const nextBtn = document.createElement("button")
  nextBtn.textContent = "next →"
  nextBtn.classList.add("next-btn")
  nextBtn.addEventListener("click", () => {
    current++
    showQuestion()
  })
  document.getElementById("answers").appendChild(nextBtn)
}

function makePlan() {
  document.getElementById("question").textContent = ""
  document.getElementById("result").style.display = "block"
  const dinner = [].concat(picks.dinner || []).join(", ")
  const activity = [].concat(picks.activity || []).join(", ")
  document.getElementById("display").textContent =
    `plan: ${picks.vibe}\ndinner: ${dinner}\nactivities: ${activity}\nvibes: ${picks.energy}`
  document.getElementById("restart").addEventListener("click", () => {
    current = 0
    Object.keys(picks).forEach(k => delete picks[k])
    document.getElementById("result").style.display = "none"
    showQuestion()
  })
}

const shareBtn = document.createElement("button")
shareBtn.textContent = "share plan 📲"
shareBtn.id = "share-btn"
shareBtn.addEventListener("click", () => {
  const text = `tonight's plan:\n${picks.vibe}\ndinner: ${[].concat(picks.dinner || []).join(", ")}\nactivities: ${[].concat(picks.activity || []).join(", ")}\nvibes: ${picks.energy}`
  if (navigator.share) {
    navigator.share({ text })
  } else {
    navigator.clipboard.writeText(text)
    shareBtn.textContent = "copied! ✓"
  }
})
document.getElementById("result").appendChild(shareBtn)

showQuestion()