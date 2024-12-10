import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import { Icon } from './icon';

interface TimeSlotInputProps {
  startTime: string;
  endTime: string;
  onStartTimeChange: (value: string) => void;
  onEndTimeChange: (value: string) => void;
  onRemove: () => void;
  isRemovable: boolean;
}

export function TimeSlotInput({
  startTime,
  endTime,
  onStartTimeChange,
  onEndTimeChange,
  onRemove,
  isRemovable,
}: TimeSlotInputProps) {
  return (
    <div className="flex items-end space-x-2">
      <div className="flex-1">
        <Label htmlFor="startTime">Horário Inicial</Label>
        <Input
          type="time"
          id="startTime"
          value={startTime}
          onChange={e => onStartTimeChange(e.target.value)}
          className="mt-2"
        />
      </div>
      <div className="flex-1">
        <Label htmlFor="endTime">Horário Final</Label>
        <Input
          type="time"
          id="endTime"
          value={endTime}
          onChange={e => onEndTimeChange(e.target.value)}
          className="mt-2"
        />
      </div>

      {isRemovable && (
        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={onRemove}
          aria-label="Remove time slot"
        >
          <Icon name="LuX" className="h-4 w-4" />
        </Button>
      )}
    </div>
  );
}
