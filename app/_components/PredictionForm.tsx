"use client";

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { HeartIcon, ActivityIcon, AlertCircleIcon } from 'lucide-react';
import { FORM_OPTIONS } from '@/constants/constants';

export default function PredictionForm() {
  const [formData, setFormData] = useState<HeartDiseaseFormData>({
    age: 0,
    sex: 0,
    cp: 0,
    trestbps: 90,
    chol: 120,
    fbs: 0,
    restecg: 0,
    thalach: 60,
    exang: 0,
    oldpeak: 0,
    slope: 0,
    ca: 0,
    thal: 0
  });

  const [prediction, setPrediction] = useState<PredictionResult | null>(null);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (field: keyof HeartDiseaseFormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: Number(value)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setPrediction(null);

    try {
      const response = await fetch('http://localhost:5000/api/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      setPrediction(result);
    } catch {
      setPrediction({
        success: false,
        error: 'Failed to connect to the server'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-12 container mx-auto">
      <Card className="w-full max-w-4xl mx-auto shadow-lg">
        <CardHeader className="space-y-2">
          <div className="flex items-center space-x-2">
            <HeartIcon className="w-6 h-6 text-red-500" />
            <CardTitle className="text-2xl font-bold">Heart Disease Risk Assessment</CardTitle>
          </div>
          <CardDescription>
            Enter your medical information below to assess your heart disease risk factors.
          </CardDescription>
        </CardHeader>
        <Separator />
        <CardContent className="pt-6">
          <ScrollArea className="h-[600px] pr-4">
            <form onSubmit={handleSubmit} className="space-y-8 p-3">
              {/* Personal Information Section */}
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <ActivityIcon className="w-5 h-5 text-slate-500" />
                  <h3 className="text-lg font-semibold">Personal Information</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Age */}
                  <div className="space-y-2">
                    <Label htmlFor="age" className="text-sm font-medium">
                      Age
                    </Label>
                    <Input
                      id="age"
                      type="number"
                      min="18"
                      max="100"
                      value={formData.age}
                      onChange={(e) => handleInputChange('age', e.target.value)}
                      className="focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>

                  {/* Sex */}
                  <div className="space-y-2">
                    <Label htmlFor="sex" className="text-sm font-medium">
                      Sex
                    </Label>
                    <Select onValueChange={(value) => handleInputChange('sex', value)}>
                      <SelectTrigger className="focus:ring-2 focus:ring-blue-500">
                        <SelectValue placeholder="Select sex" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="0">Male</SelectItem>
                        <SelectItem value="1">Female</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              {/* Cardiac Symptoms Section */}
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <AlertCircleIcon className="w-5 h-5 text-slate-500" />
                  <h3 className="text-lg font-semibold">Cardiac Symptoms</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Chest Pain */}
                  <div className="space-y-2">
                    <Label htmlFor="cp" className="text-sm font-medium">
                      Chest Pain Type
                    </Label>
                    <Select onValueChange={(value) => handleInputChange('cp', value)}>
                      <SelectTrigger className="focus:ring-2 focus:ring-blue-500">
                        <SelectValue placeholder="Select chest pain type" />
                      </SelectTrigger>
                      <SelectContent>
                        {FORM_OPTIONS.chestPain.map((option) => (
                          <SelectItem key={option.value} value={option.value.toString()}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Exercise Induced Angina */}
                  <div className="space-y-2">
                    <Label htmlFor="exang" className="text-sm font-medium">
                      Exercise Induced Angina
                    </Label>
                    <Select onValueChange={(value) => handleInputChange('exang', value)}>
                      <SelectTrigger className="focus:ring-2 focus:ring-blue-500">
                        <SelectValue placeholder="Select angina status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="0">No</SelectItem>
                        <SelectItem value="1">Yes</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              {/* Vital Measurements Section */}
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <ActivityIcon className="w-5 h-5 text-slate-500" />
                  <h3 className="text-lg font-semibold">Vital Measurements</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Blood Pressure */}
                  <div className="space-y-2">
                    <Label htmlFor="trestbps" className="text-sm font-medium">
                      Resting Blood Pressure (mm Hg)
                    </Label>
                    <Input
                      id="trestbps"
                      type="number"
                      min="90"
                      max="200"
                      value={formData.trestbps}
                      onChange={(e) => handleInputChange('trestbps', e.target.value)}
                      className="focus:ring-2 focus:ring-blue-500"
                      required
                    />
                    {(formData.trestbps < 90 || formData.trestbps > 200) && (
                      <Alert className="bg-red-50 mt-2">
                        <AlertTitle>Warning</AlertTitle>
                        <AlertDescription>
                          Resting Blood Pressure must be between 90 and 200 mm Hg.
                        </AlertDescription>
                      </Alert>
                    )}
                  </div>

                  {/* Cholesterol */}
                  <div className="space-y-2">
                    <Label htmlFor="chol" className="text-sm font-medium">
                      Serum Cholesterol (mg/dl)
                    </Label>
                    <Input
                      id="chol"
                      type="number"
                      min="120"
                      max="600"
                      value={formData.chol}
                      onChange={(e) => handleInputChange('chol', e.target.value)}
                      className="focus:ring-2 focus:ring-blue-500"
                      required
                    />
                    {(formData.chol < 120 || formData.chol > 600) && (
                      <Alert className="bg-red-50 mt-2">
                        <AlertTitle>Warning</AlertTitle>
                        <AlertDescription>
                          Serum Cholesterol must be between 120 and 600 mg/dl.
                        </AlertDescription>
                      </Alert>
                    )}
                  </div>

                  {/* Maximum Heart Rate */}
                  <div className="space-y-2">
                    <Label htmlFor="thalach" className="text-sm font-medium">
                      Maximum Heart Rate
                    </Label>
                    <Input
                      id="thalach"
                      type="number"
                      min="60"
                      max="220"
                      value={formData.thalach}
                      onChange={(e) => handleInputChange('thalach', e.target.value)}
                      className="focus:ring-2 focus:ring-blue-500"
                      required
                    />
                    {(formData.thalach < 60 || formData.thalach > 220) && (
                      <Alert className="bg-red-50 mt-2">
                        <AlertTitle>Warning</AlertTitle>
                        <AlertDescription>
                          Maximum Heart Rate must be between 60 and 220.
                        </AlertDescription>
                      </Alert>
                    )}
                  </div>

                  {/* Fasting Blood Sugar */}
                  <div className="space-y-2">
                    <Label htmlFor="fbs" className="text-sm font-medium">
                      Fasting Blood Sugar {'>'} 120 mg/dl
                    </Label>
                    <Select onValueChange={(value) => handleInputChange('fbs', value)}>
                      <SelectTrigger className="focus:ring-2 focus:ring-blue-500">
                        <SelectValue placeholder="Select fasting blood sugar" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="0">No</SelectItem>
                        <SelectItem value="1">Yes</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              {/* Medical Tests Section */}
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <ActivityIcon className="w-5 h-5 text-slate-500" />
                  <h3 className="text-lg font-semibold">Medical Tests</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Resting ECG */}
                  <div className="space-y-2">
                    <Label htmlFor="restecg" className="text-sm font-medium">
                      Resting ECG Results
                    </Label>
                    <Select onValueChange={(value) => handleInputChange('restecg', value)}>
                      <SelectTrigger className="focus:ring-2 focus:ring-blue-500">
                        <SelectValue placeholder="Select ECG results" />
                      </SelectTrigger>
                      <SelectContent>
                        {FORM_OPTIONS.ecg.map((option) => (
                          <SelectItem key={option.value} value={option.value.toString()}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* ST Depression */}
                  <div className="space-y-2">
                    <Label htmlFor="oldpeak" className="text-sm font-medium">
                      ST Depression
                    </Label>
                    <Select onValueChange={(value) => handleInputChange('oldpeak', value)}>
                      <SelectTrigger className="focus:ring-2 focus:ring-blue-500">
                        <SelectValue placeholder="Select ST depression level" />
                      </SelectTrigger>
                      <SelectContent>
                        {FORM_OPTIONS.oldpeak.map((option) => (
                          <SelectItem key={option.value} value={option.value.toString()}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* ST Slope */}
                  <div className="space-y-2">
                    <Label htmlFor="slope" className="text-sm font-medium">
                      ST Slope
                    </Label>
                    <Select onValueChange={(value) => handleInputChange('slope', value)}>
                      <SelectTrigger className="focus:ring-2 focus:ring-blue-500">
                        <SelectValue placeholder="Select ST slope" />
                      </SelectTrigger>
                      <SelectContent>
                        {FORM_OPTIONS.slope.map((option) => (
                          <SelectItem key={option.value} value={option.value.toString()}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Number of Major Vessels */}
                  <div className="space-y-2">
                    <Label htmlFor="ca" className="text-sm font-medium">
                      Number of Major Vessels (0-3)
                    </Label>
                    <Select value={formData.ca.toString()} onValueChange={(value) => handleInputChange('ca', value)}>
                      <SelectTrigger className="focus:ring-2 focus:ring-blue-500">
                        <SelectValue placeholder="Select number of vessels" />
                      </SelectTrigger>
                      <SelectContent>
                        {["0", "1", "2", "3"].map((value) => (
                          <SelectItem key={value} value={value.toString()}>
                            {value}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Thalassemia */}
                  <div className="space-y-2">
                    <Label htmlFor="thal" className="text-sm font-medium">
                      Thalassemia
                    </Label>
                    <Select onValueChange={(value) => handleInputChange('thal', value)}>
                      <SelectTrigger className="focus:ring-2 focus:ring-blue-500">
                        <SelectValue placeholder="Select thalassemia type" />
                      </SelectTrigger>
                      <SelectContent>
                        {FORM_OPTIONS.thalassemia.map((option) => (
                          <SelectItem key={option.value} value={option.value.toString()}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <Button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700"
                  disabled={loading || formData.age < 18 || formData.age > 100 || formData.trestbps < 90 || formData.trestbps > 200 || formData.chol < 120 || formData.chol > 600 || formData.thalach < 60 || formData.thalach > 220}
                >
                  {loading ? (
                    <div className="flex items-center space-x-2">
                      <span>Processing</span>
                      <Progress value={100} className="w-8" />
                    </div>
                  ) : (
                    'Get Prediction'
                  )}
                </Button>
              </div>
            </form>
          </ScrollArea>

            {prediction && (
            <div className="mt-6">
              {prediction.success ? (
              <Alert className={`p-4 rounded-lg shadow-md ${prediction.prediction === 1 ? 'bg-red-100 border-l-4 border-red-500' : 'bg-green-100 border-l-4 border-green-500'}`}>
                <AlertTitle className="text-lg font-semibold">
                {prediction.prediction === 1 ? 'Heart Disease Risk Detected' : 'No Heart Disease Risk Detected'}
                </AlertTitle>
                <AlertDescription className="mt-2 text-sm">
                Confidence: {prediction.probability ? (prediction.probability.positive * 100).toFixed(2) : 'N/A'}%
                </AlertDescription>
              </Alert>
              ) : (
              <Alert className="p-4 bg-red-100 border-l-4 border-red-500 rounded-lg shadow-md">
                <AlertTitle className="text-lg font-semibold">Error</AlertTitle>
                <AlertDescription className="mt-2 text-sm">{prediction.error}</AlertDescription>
              </Alert>
              )}
            </div>
            )}
        </CardContent>
      </Card>
    </div>
  );
}