// src/components/PasswordStrengthMeter.jsx
const PasswordStrengthMeter = ({ strength }) => {
    const getStrengthText = () => {
      switch(strength) {
        case 0: return 'Very Weak';
        case 1: return 'Weak';
        case 2: return 'Fair';
        case 3: return 'Good';
        case 4: return 'Strong';
        default: return 'Very Weak';
      }
    };
  
    const getColor = () => {
      switch(strength) {
        case 0: return 'bg-red-500';
        case 1: return 'bg-orange-500';
        case 2: return 'bg-yellow-500';
        case 3: return 'bg-blue-500';
        case 4: return 'bg-green-500';
        default: return 'bg-gray-200';
      }
    };
  
    return (
      <div className="space-y-2">
        <div className="flex gap-1 w-full">
          {[...Array(4)].map((_, index) => (
            <div 
              key={index}
              className={`h-2 w-full rounded-full transition-all ${
                index < strength ? getColor() : 'bg-gray-200'
              }`}
            />
          ))}
        </div>
        <div className="text-sm flex justify-between">
          <span className={`font-medium ${getColor().replace('bg', 'text')}`}>
            {getStrengthText()}
          </span>
          <span className="text-gray-500">
            {strength}/4 requirements met
          </span>
        </div>
      </div>
    );
  };
  
  export default PasswordStrengthMeter;
  