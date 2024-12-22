interface HeartDiseaseFormData {
  age: number;
  sex: number;
  cp: number;
  trestbps: number;
  chol: number;
  fbs: number;
  restecg: number;
  thalach: number;
  exang: number;
  oldpeak: number;
  slope: number;
  ca: number;
  thal: number;
}

interface PredictionResult {
  success: boolean;
  prediction?: number;
  probability?: {
    negative: number;
    positive: number;
  };
  timestamp?: string;
  error?: string;
  errors?: string[];
}