import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogFooter, DialogTitle } from '@/components/ui/dialog';
import { Progress } from '@/components/ui/progress';
import { HeartPulse, ShieldCheck } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PredictionDialogProps {
  prediction: PredictionResult;
  onClose: () => void;
}

const PredictionDialog = ({ prediction, onClose }: PredictionDialogProps) => {
  if (!prediction.success) {
    return (
      <Dialog open={true} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-md">
          <Card className="border-0 shadow-none">
            <DialogHeader>
              <DialogTitle className="text-xl font-semibold text-red-700">Error</DialogTitle>
            </DialogHeader>
            <CardContent className="space-y-4 px-0">
              <p className="text-sm text-muted-foreground">
                {prediction.error || "An error occurred while processing your request."}
              </p>
            </CardContent>
            <DialogFooter className="mt-4">
              <Button onClick={onClose} variant="destructive" className="w-full">
                Close
              </Button>
            </DialogFooter>
          </Card>
        </DialogContent>
      </Dialog>
    );
  }

  const riskLevel = (prediction.probability?.positive ?? 0) > 0.5;
  const probabilityPercentage = ((prediction.probability?.positive ?? 0) * 100).toFixed(1);

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <Card className={`border-0 shadow-none`}>
          <DialogHeader className="flex flex-row items-center gap-2 pb-2">
            {riskLevel ? (
              <HeartPulse className="w-6 h-6 text-red-500" />
            ) : (
              <ShieldCheck className="w-6 h-6 text-green-500" />
            )}
            <DialogTitle className={`text-xl font-semibold ${riskLevel ? 'text-red-700' : 'text-green-700'}`}>
              {riskLevel ? 'Heart Disease Risk Detected' : 'No Heart Disease Risk Detected'}
            </DialogTitle>
          </DialogHeader>

          <CardContent className="space-y-4 px-0">
            <div className="space-y-2">
              <div className="flex justify-between text-sm font-medium">
                <span>Risk Level</span>
                <span className={riskLevel ? 'text-red-600' : 'text-green-600'}>
                  {probabilityPercentage}%
                </span>
              </div>
              <Progress
                value={parseFloat(probabilityPercentage)}
                className={cn(
                  "h-2",
                  riskLevel 
                    ? "[&>div]:bg-red-500 bg-red-100" 
                    : "[&>div]:bg-green-500 bg-green-100"
                )}
              />
            </div>

            <p className="text-sm text-muted-foreground">
              {riskLevel
                ? "Based on the provided data, there are indicators suggesting a potential risk of heart disease. Please consult with a healthcare professional for a thorough evaluation."
                : "Based on the provided data, no significant risk factors for heart disease were identified. However, maintaining a healthy lifestyle is always recommended."}
            </p>
          </CardContent>

          <DialogFooter className="mt-4">
            <Button
              onClick={onClose}
              variant={riskLevel ? "destructive" : "default"}
              className="w-full"
            >
              Close
            </Button>
          </DialogFooter>
        </Card>
      </DialogContent>
    </Dialog>
  );
};

export default PredictionDialog;