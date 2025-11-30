import React, { useState } from 'react';
import { Lightbulb, FileText, Download, Clock, Target, CheckCircle } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

interface ProjectIdea {
  id: string;
  title: string;
  subject: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  duration: string;
  description: string;
  materials: string[];
  steps: string[];
}

const mockProjectIdeas: ProjectIdea[] = [
  {
    id: '1',
    title: 'Solar System Model with Arduino',
    subject: 'Physics',
    difficulty: 'Medium',
    duration: '2-3 weeks',
    description: 'Create an interactive solar system model using Arduino to demonstrate planetary motion and distances.',
    materials: ['Arduino Uno', 'LED strips', 'Servo motors', 'Cardboard', 'Paint', 'Wires'],
    steps: [
      'Research planetary distances and orbital periods',
      'Design the base structure and planetary positions',
      'Program Arduino for LED patterns and motor control',
      'Assemble the physical model',
      'Test and calibrate the system',
      'Prepare presentation and documentation'
    ]
  },
  {
    id: '2',
    title: 'Mathematical Patterns in Nature',
    subject: 'Mathematics',
    difficulty: 'Easy',
    duration: '1-2 weeks',
    description: 'Explore and document mathematical patterns found in nature like Fibonacci sequences, fractals, and golden ratio.',
    materials: ['Camera', 'Measuring tools', 'Graph paper', 'Calculator', 'Natural specimens'],
    steps: [
      'Collect natural specimens showing patterns',
      'Measure and document mathematical relationships',
      'Create visual representations and graphs',
      'Analyze patterns using mathematical formulas',
      'Compile findings into a comprehensive report',
      'Present discoveries with visual aids'
    ]
  },
  {
    id: '3',
    title: 'Water Quality Analysis Lab',
    subject: 'Chemistry',
    difficulty: 'Hard',
    duration: '3-4 weeks',
    description: 'Conduct comprehensive water quality testing from different sources and analyze chemical composition.',
    materials: ['pH strips', 'Test tubes', 'Chemical indicators', 'Microscope', 'Water samples', 'Lab equipment'],
    steps: [
      'Collect water samples from various sources',
      'Perform pH, dissolved oxygen, and turbidity tests',
      'Test for chemical contaminants and bacteria',
      'Record and analyze all measurements',
      'Compare results with safety standards',
      'Create recommendations and final report'
    ]
  },
  {
    id: '4',
    title: 'Smart Home Automation System',
    subject: 'Computer Science',
    difficulty: 'Hard',
    duration: '4-5 weeks',
    description: 'Build an IoT-based smart home automation system using sensors, microcontrollers, and mobile app integration.',
    materials: ['Raspberry Pi', 'Arduino sensors', 'Relay modules', 'WiFi module', 'Mobile development tools', 'Breadboard', 'Jumper wires'],
    steps: [
      'Design system architecture and component layout',
      'Set up Raspberry Pi and install required software',
      'Connect and program sensors (temperature, motion, light)',
      'Implement relay controls for appliances',
      'Develop mobile app for remote control',
      'Test system integration and troubleshoot issues',
      'Create user manual and project documentation'
    ]
  },
  {
    id: '5',
    title: 'Ecosystem Food Web Analysis',
    subject: 'Biology',
    difficulty: 'Medium',
    duration: '2-3 weeks',
    description: 'Study and create a detailed food web model of a local ecosystem, analyzing energy flow and species relationships.',
    materials: ['Field notebook', 'Camera', 'Identification guides', 'Measuring tools', 'Graph paper', 'Research materials'],
    steps: [
      'Select and survey a local ecosystem area',
      'Identify and catalog plant and animal species',
      'Research feeding habits and relationships',
      'Map energy flow and trophic levels',
      'Create visual food web diagram',
      'Analyze ecosystem balance and human impact',
      'Present findings with recommendations'
    ]
  }
];

export default function ProjectHelper() {
  const { user } = useAuth();
  const [selectedProject, setSelectedProject] = useState<ProjectIdea | null>(null);
  const [generatingReport, setGeneratingReport] = useState(false);
  const [reportGenerated, setReportGenerated] = useState(false);
  const [showCustomGenerator, setShowCustomGenerator] = useState(false);
  const [customProjectForm, setCustomProjectForm] = useState({
    subject: '',
    topic: '',
    difficulty: 'Medium' as 'Easy' | 'Medium' | 'Hard',
    duration: '2-3 weeks'
  });
  const [generatingCustom, setGeneratingCustom] = useState(false);

  const userSubjects = user?.profile?.subjects || ['Mathematics', 'Physics', 'Chemistry', 'Biology', 'Computer Science'];
  
  // Show all projects if user has no subjects defined, otherwise filter
  const filteredProjects = userSubjects.length > 0 
    ? mockProjectIdeas.filter(project => userSubjects.includes(project.subject))
    : mockProjectIdeas;

  const handleGenerateReport = async (project: ProjectIdea) => {
    setGeneratingReport(true);
    
    // Simulate AI report generation
    setTimeout(() => {
      setGeneratingReport(false);
      setReportGenerated(true);
    }, 3000);
  };

  const handleGenerateCustomProject = async () => {
    setGeneratingCustom(true);
    
    // Simulate AI custom project generation
    setTimeout(() => {
      const customProject: ProjectIdea = {
        id: 'custom-' + Date.now(),
        title: `${customProjectForm.subject} ${customProjectForm.topic} Project`,
        subject: customProjectForm.subject,
        difficulty: customProjectForm.difficulty,
        duration: customProjectForm.duration,
        description: `A comprehensive ${customProjectForm.difficulty.toLowerCase()} level project focusing on ${customProjectForm.topic} in ${customProjectForm.subject}. This AI-generated project will help you explore key concepts through hands-on learning.`,
        materials: [
          'Research materials and textbooks',
          'Laboratory equipment (if applicable)',
          'Computer for data analysis',
          'Presentation materials',
          'Documentation tools'
        ],
        steps: [
          `Research fundamental concepts of ${customProjectForm.topic}`,
          'Define project scope and objectives',
          'Gather necessary materials and resources',
          'Conduct experiments or analysis',
          'Document findings and observations',
          'Prepare final presentation and report'
        ]
      };
      
      setSelectedProject(customProject);
      setGeneratingCustom(false);
      setShowCustomGenerator(false);
    }, 2000);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-100 text-green-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Hard': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Project Helper</h1>
        <p className="text-gray-600">Get AI-powered project ideas and step-by-step execution plans</p>
      </div>

      {!selectedProject ? (
        <>
          {/* Project Ideas Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-all duration-300 cursor-pointer"
                onClick={() => setSelectedProject(project)}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Lightbulb className="h-6 w-6 text-blue-600" />
                  </div>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getDifficultyColor(project.difficulty)}`}>
                    {project.difficulty}
                  </span>
                </div>
                
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{project.title}</h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">{project.description}</p>
                
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span className="flex items-center space-x-1">
                    <Target className="h-4 w-4" />
                    <span>{project.subject}</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <Clock className="h-4 w-4" />
                    <span>{project.duration}</span>
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Generate Custom Project Section */}
          {!showCustomGenerator ? (
            <div className="bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 rounded-xl p-6 border border-purple-200 dark:border-purple-700">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center">
                  <Lightbulb className="h-6 w-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">Need a Custom Project?</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">Get AI-generated project ideas tailored to your specific requirements and interests.</p>
                </div>
                <button 
                  onClick={() => setShowCustomGenerator(true)}
                  className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors"
                >
                  Generate Ideas
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Generate Custom Project</h3>
                <button 
                  onClick={() => setShowCustomGenerator(false)}
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                >
                  ✕
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Subject</label>
                  <select
                    value={customProjectForm.subject}
                    onChange={(e) => setCustomProjectForm({ ...customProjectForm, subject: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  >
                    <option value="">Select Subject</option>
                    {userSubjects.map(subject => (
                      <option key={subject} value={subject}>{subject}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Topic/Area</label>
                  <input
                    type="text"
                    value={customProjectForm.topic}
                    onChange={(e) => setCustomProjectForm({ ...customProjectForm, topic: e.target.value })}
                    placeholder="e.g., Renewable Energy, Data Structures"
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Difficulty</label>
                  <select
                    value={customProjectForm.difficulty}
                    onChange={(e) => setCustomProjectForm({ ...customProjectForm, difficulty: e.target.value as any })}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  >
                    <option value="Easy">Easy</option>
                    <option value="Medium">Medium</option>
                    <option value="Hard">Hard</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Duration</label>
                  <select
                    value={customProjectForm.duration}
                    onChange={(e) => setCustomProjectForm({ ...customProjectForm, duration: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  >
                    <option value="1-2 weeks">1-2 weeks</option>
                    <option value="2-3 weeks">2-3 weeks</option>
                    <option value="3-4 weeks">3-4 weeks</option>
                    <option value="4-5 weeks">4-5 weeks</option>
                  </select>
                </div>
              </div>
              
              <button
                onClick={handleGenerateCustomProject}
                disabled={!customProjectForm.subject || !customProjectForm.topic || generatingCustom}
                className="w-full bg-purple-600 text-white py-3 px-4 rounded-lg hover:bg-purple-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {generatingCustom ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    Generating Project...
                  </>
                ) : (
                  <>
                    <Lightbulb className="h-4 w-4 mr-2" />
                    Generate Custom Project
                  </>
                )}
              </button>
            </div>
          )}
        </>
      ) : (
        /* Project Details */
        <div className="space-y-6">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setSelectedProject(null)}
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              ← Back to Projects
            </button>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{selectedProject.title}</h1>
                <p className="text-gray-600 dark:text-gray-400">{selectedProject.description}</p>
              </div>
              <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(selectedProject.difficulty)}`}>
                {selectedProject.difficulty}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <Target className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                <p className="font-medium text-gray-900 dark:text-white">{selectedProject.subject}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Subject</p>
              </div>
              <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <Clock className="h-8 w-8 text-green-600 mx-auto mb-2" />
                <p className="font-medium text-gray-900 dark:text-white">{selectedProject.duration}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Duration</p>
              </div>
              <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <FileText className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                <p className="font-medium text-gray-900 dark:text-white">{selectedProject.steps.length} Steps</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Execution Plan</p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Materials Needed */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Materials Needed</h3>
                <div className="space-y-2">
                  {selectedProject.materials.map((material, index) => (
                    <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      <span className="text-gray-900 dark:text-white">{material}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Execution Steps */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Execution Steps</h3>
                <div className="space-y-3">
                  {selectedProject.steps.map((step, index) => (
                    <div key={index} className="flex items-start space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-medium mt-0.5">
                        {index + 1}
                      </div>
                      <span className="text-gray-900 dark:text-white flex-1">{step}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Generate Report Section */}
            <div className="mt-8 p-6 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">Auto-Generate Project Report</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">Get a professionally formatted project report template with all sections pre-filled.</p>
                </div>
                <div className="flex space-x-3">
                  {reportGenerated ? (
                    <>
                      <button className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
                        <Download className="h-4 w-4" />
                        <span>Download PDF</span>
                      </button>
                      <button className="flex items-center space-x-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 px-4 py-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                        <Download className="h-4 w-4" />
                        <span>Download Word</span>
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={() => handleGenerateReport(selectedProject)}
                      disabled={generatingReport}
                      className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
                    >
                      {generatingReport ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          <span>Generating...</span>
                        </>
                      ) : (
                        <>
                          <FileText className="h-4 w-4" />
                          <span>Generate Report</span>
                        </>
                      )}
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}