// Mock data for quizzes
export const quizzesData = {
  physics: [
    {
      id: "quiz-mechanics",
      title: "Mechanics Quiz",
      subject: "Physics Fundamentals",
      subjectId: "physics-fundamentals",
      description: "Test your knowledge of mechanics concepts including kinematics, forces, energy, and momentum.",
      timeLimit: 30, // in minutes
      passingScore: 70,
      questions: [
        {
          id: "q1",
          text: "Which of Newton's laws states that an object at rest stays at rest, and an object in motion stays in motion unless acted upon by an external force?",
          options: [
            { id: "a", text: "First Law (Law of Inertia)" },
            { id: "b", text: "Second Law (F = ma)" },
            { id: "c", text: "Third Law (Action-Reaction)" },
            { id: "d", text: "Law of Conservation of Momentum" },
          ],
          correctAnswer: "a",
          explanation:
            "Newton's First Law, also known as the Law of Inertia, states that an object will remain at rest or in uniform motion in a straight line unless acted upon by an external force.",
        },
        {
          id: "q2",
          text: "What is the formula for kinetic energy?",
          options: [
            { id: "a", text: "KE = mgh" },
            { id: "b", text: "KE = 1/2 mv²" },
            { id: "c", text: "KE = Fd" },
            { id: "d", text: "KE = mv" },
          ],
          correctAnswer: "b",
          explanation:
            "Kinetic energy is the energy possessed by an object due to its motion. The formula is KE = 1/2 mv², where m is mass and v is velocity.",
        },
        {
          id: "q3",
          text: "Which of the following is a vector quantity?",
          options: [
            { id: "a", text: "Mass" },
            { id: "b", text: "Time" },
            { id: "c", text: "Displacement" },
            { id: "d", text: "Energy" },
          ],
          correctAnswer: "c",
          explanation:
            "Displacement is a vector quantity because it has both magnitude and direction. Mass, time, and energy are scalar quantities that have only magnitude.",
        },
        {
          id: "q4",
          text: "What happens to the gravitational force between two objects when the distance between them is doubled?",
          options: [
            { id: "a", text: "It doubles" },
            { id: "b", text: "It halves" },
            { id: "c", text: "It becomes one-fourth" },
            { id: "d", text: "It remains the same" },
          ],
          correctAnswer: "c",
          explanation:
            "According to Newton's Law of Universal Gravitation, the gravitational force is inversely proportional to the square of the distance. When the distance doubles, the force becomes (1/2)² = 1/4 of the original force.",
        },
        {
          id: "q5",
          text: "Which principle states that the total momentum of an isolated system remains constant?",
          options: [
            { id: "a", text: "Conservation of Energy" },
            { id: "b", text: "Conservation of Momentum" },
            { id: "c", text: "Conservation of Mass" },
            { id: "d", text: "Conservation of Angular Momentum" },
          ],
          correctAnswer: "b",
          explanation:
            "The Law of Conservation of Momentum states that in an isolated system (no external forces), the total momentum remains constant. This is a fundamental principle in mechanics.",
        },
      ],
    },
    {
      id: "quiz-thermodynamics",
      title: "Thermodynamics Quiz",
      subject: "Physics Fundamentals",
      subjectId: "physics-fundamentals",
      description: "Test your understanding of thermodynamics principles and applications.",
      timeLimit: 25,
      passingScore: 70,
      questions: [
        {
          id: "q1",
          text: "What is the First Law of Thermodynamics?",
          options: [
            { id: "a", text: "Energy cannot be created or destroyed" },
            { id: "b", text: "Entropy of an isolated system always increases" },
            { id: "c", text: "Heat flows from hot to cold bodies" },
            { id: "d", text: "It is impossible to reach absolute zero" },
          ],
          correctAnswer: "a",
        },
      ],
    },
  ],
  chemistry: [
    {
      id: "quiz-periodic-table",
      title: "Periodic Table Quiz",
      subject: "Chemistry Essentials",
      subjectId: "chemistry-essentials",
      description: "Test your knowledge of the periodic table and element properties.",
      timeLimit: 20,
      passingScore: 75,
      questions: [
        {
          id: "q1",
          text: "Which element has the highest electronegativity?",
          options: [
            { id: "a", text: "Oxygen" },
            { id: "b", text: "Chlorine" },
            { id: "c", text: "Fluorine" },
            { id: "d", text: "Nitrogen" },
          ],
          correctAnswer: "c",
        },
      ],
    },
  ],
  mathematics: [
    {
      id: "quiz-calculus",
      title: "Calculus Basics",
      subject: "Mathematics Mastery",
      subjectId: "mathematics-mastery",
      description: "Test your understanding of basic calculus concepts.",
      timeLimit: 30,
      passingScore: 70,
      questions: [
        {
          id: "q1",
          text: "What is the derivative of sin(x)?",
          options: [
            { id: "a", text: "cos(x)" },
            { id: "b", text: "-sin(x)" },
            { id: "c", text: "tan(x)" },
            { id: "d", text: "-cos(x)" },
          ],
          correctAnswer: "a",
        },
      ],
    },
  ],
}
