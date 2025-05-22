// Mock data for subjects
export const subjectsData = {
  "class-11": [
    {
      id: "physics-fundamentals",
      title: "Physics Fundamentals",
      description:
        "Master the core concepts of Physics with comprehensive lessons covering mechanics, thermodynamics, electricity, magnetism, and modern physics.",
      image: "/placeholder.svg?height=300&width=600",
      level: "Class 11",
      instructor: "Dr. Rajesh Kumar",
      duration: "48 hours",
      totalTopics: 15,
      totalQuizzes: 12,
      rating: 4.8,
      students: 1250,
      topics: [
        {
          id: "mechanics",
          title: "Mechanics",
          description: "Study of motion, forces, energy, and momentum",
          lessons: [
            { id: "kinematics", title: "Kinematics", duration: "45 min" },
            { id: "newtons-laws", title: "Newton's Laws of Motion", duration: "60 min" },
            { id: "work-energy", title: "Work and Energy", duration: "50 min" },
            { id: "momentum", title: "Momentum and Collisions", duration: "55 min" },
          ],
        },
        {
          id: "thermodynamics",
          title: "Thermodynamics",
          description: "Study of heat, temperature, and energy transfer",
          lessons: [
            { id: "temperature", title: "Temperature and Heat", duration: "40 min" },
            { id: "laws-thermodynamics", title: "Laws of Thermodynamics", duration: "65 min" },
            { id: "heat-engines", title: "Heat Engines and Efficiency", duration: "50 min" },
          ],
        },
      ],
    },
    {
      id: "chemistry-essentials",
      title: "Chemistry Essentials",
      description: "Comprehensive guide to Class 11 Chemistry",
      instructor: "Dr. Priya Singh",
      duration: "45 hours",
      topics: [
        { title: "Atomic Structure", description: "Understanding the atom and its components" },
        { title: "Chemical Bonding", description: "How atoms combine to form molecules" },
        { title: "States of Matter", description: "Properties of solids, liquids, and gases" },
      ],
      rating: 4.7,
      students: 980,
      image: "/placeholder.svg?height=200&width=300",
      category: "Science",
    },
  ],
  "class-12": [
    {
      id: "advanced-physics",
      title: "Advanced Physics",
      description: "Prepare for board exams and competitive tests",
      instructor: "Dr. Vikram Patel",
      duration: "54 hours",
      topics: [
        { title: "Electrostatics", description: "Study of electric charges at rest" },
        { title: "Current Electricity", description: "Flow of electric charge" },
        { title: "Magnetism", description: "Magnetic fields and their effects" },
      ],
      rating: 4.9,
      students: 1580,
      image: "/placeholder.svg?height=200&width=300",
      category: "Science",
    },
  ],
  graduation: [
    {
      id: "computer-science-fundamentals",
      title: "Computer Science Fundamentals",
      description: "Core CS concepts for undergraduate students",
      instructor: "Prof. Arun Mishra",
      duration: "72 hours",
      topics: [
        { title: "Data Structures", description: "Organizing and storing data" },
        { title: "Algorithms", description: "Problem-solving methods" },
        { title: "Programming Paradigms", description: "Different approaches to programming" },
      ],
      rating: 4.9,
      students: 2150,
      image: "/placeholder.svg?height=200&width=300",
      category: "Engineering",
    },
  ],
  masters: [
    {
      id: "advanced-data-science",
      title: "Advanced Data Science",
      description: "Master data analysis, machine learning, and AI",
      instructor: "Prof. Rajiv Khanna",
      duration: "80 hours",
      topics: [
        { title: "Machine Learning", description: "Algorithms that learn from data" },
        { title: "Deep Learning", description: "Neural networks and their applications" },
        { title: "Big Data Analytics", description: "Processing and analyzing large datasets" },
      ],
      rating: 4.9,
      students: 1450,
      image: "/placeholder.svg?height=200&width=300",
      category: "Technology",
    },
  ],
}
