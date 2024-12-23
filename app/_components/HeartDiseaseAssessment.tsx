"use client";

import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { HeartIcon, InfoIcon, ActivityIcon, Stethoscope, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import PredictionForm from './PredictionForm';
import { ScrollArea } from '@/components/ui/scroll-area';

const HeartDiseaseAssessment = () => {
  const [showForm, setShowForm] = useState(false);
  const [activeSection, setActiveSection] = useState<number | null>(null);

  const containerVariants = {
    enter: { x: '5%', opacity: 0 },
    center: { x: 0, opacity: 1 },
    exit: { x: '-5%', opacity: 0 }
  };

  const factorsData = [
    {
      title: 'Personal Factors',
      icon: <InfoIcon className="w-5 h-5 text-blue-500" />,
      items: ['Age', 'Gender'],
      description: 'Basic demographic information that affects heart health risk assessment.'
    },
    {
      title: 'Clinical Measurements',
      icon: <ActivityIcon className="w-5 h-5 text-green-500" />,
      items: ['Blood Pressure', 'Cholesterol', 'Fasting Blood Sugar', 'Max Heart Rate'],
      description: 'Key vitals and measurements that indicate cardiovascular health.'
    },
    {
      title: 'Medical Tests',
      icon: <Stethoscope className="w-5 h-5 text-purple-500" />,
      items: ['ECG Results', 'Exercise Angina', 'ST Depression', 'Fluoroscopy Results'],
      description: 'Specialized medical test results for comprehensive analysis.'
    },
  ];

  return (
    <div className="py-6 sm:py-12 px-4 sm:px-6 container mx-auto">
      <AnimatePresence mode="wait">
        {!showForm ? (
          <motion.div
            key="home"
            initial="enter"
            animate="center"
            exit="exit"
            variants={containerVariants}
            transition={{ type: "tween", duration: 0.5 }}
          >
            <Card className="w-full max-w-4xl mx-auto shadow-xl bg-gradient-to-br from-white to-gray-50">
              <CardHeader className="space-y-4 pt-6 sm:pt-10 px-4 sm:px-6">
                <div className="flex items-center space-x-2 flex-wrap">
                  <HeartIcon className="w-6 h-6 text-red-500" />
                  <CardTitle className="text-md sm:text-2xl font-bold">
                    Heart Disease Risk Assessment
                  </CardTitle>
                </div>
                <CardDescription className="text-sm sm:text-lg">
                  This interactive tool uses machine learning to assess your heart disease risk
                  based on various health factors.
                </CardDescription>
              </CardHeader>
              <Separator className="bg-gradient-to-r from-red-200 to-red-300" />
              <CardContent className="pt-6 sm:pt-8 px-4 sm:px-6">
                <ScrollArea className="h-[500px] pr-4 md:h-full">
                  <div className="flex flex-col space-y-6 sm:space-y-8">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                      {factorsData.map((section, idx) => (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: idx * 0.2 }}
                          className="space-y-3 sm:space-y-4"
                          onMouseEnter={() => setActiveSection(idx)}
                          onMouseLeave={() => setActiveSection(null)}
                        >
                          <div className="flex items-center space-x-2">
                            {section.icon}
                            <h3 className="font-semibold text-base sm:text-lg">{section.title}</h3>
                          </div>
                          <p className="text-xs sm:text-sm text-gray-600">{section.description}</p>
                          <ul className="space-y-2 sm:space-y-3">
                            {section.items.map((item, itemIdx) => (
                              <motion.li
                                key={itemIdx}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: idx * 0.2 + itemIdx * 0.1 }}
                                className={`
                                text-gray-600 flex items-center space-x-3 p-2 rounded-lg text-sm
                                transition-colors duration-200
                                ${activeSection === idx ? 'bg-gray-50' : ''}
                              `}
                              >
                                <div className={`w-2 h-2 rounded-full ${idx === 0 ? 'bg-blue-400' :
                                    idx === 1 ? 'bg-green-400' :
                                      'bg-purple-400'
                                  }`} />
                                <span>{item}</span>
                              </motion.li>
                            ))}
                          </ul>
                        </motion.div>
                      ))}
                    </div>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.8 }}
                      className="flex flex-col items-center pt-4 sm:pt-6 space-y-4"
                    >
                      <Button
                        onClick={() => setShowForm(true)}
                        className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-6 sm:px-8 py-6 sm:py-8 rounded-full flex items-center space-x-1 transform transition-transform hover:scale-105 w-full sm:w-auto justify-center"
                      >
                        <span className="text-base sm:text-lg">Start Assessment</span>
                        <ChevronRight className="w-5 h-5" />
                      </Button>
                      <p className="text-xs sm:text-sm text-gray-500">Takes approximately 5 minutes</p>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1 }}
                      className="bg-gray-50 p-4 sm:p-6 rounded-lg"
                    >
                      <h4 className="text-center font-medium mb-2 text-sm sm:text-base">Powered by AI</h4>
                      <p className="text-center text-xs sm:text-sm text-gray-600">
                        Our assessment leverages multiple state-of-the-art machine learning models
                        including K-Nearest Neighbors, Random Forest, XGBoost, and Gradient Boosting
                        for highly accurate risk prediction and analysis.
                      </p>
                    </motion.div>
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </motion.div>
        ) : (
          <motion.div
            key="form"
            initial="enter"
            animate="center"
            exit="exit"
            variants={containerVariants}
            transition={{ type: "tween", duration: 0.5 }}
            className="relative"
          >
            <PredictionForm setShowForm={setShowForm} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default HeartDiseaseAssessment;