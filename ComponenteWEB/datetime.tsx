import React, { useState } from 'react';
import { View } from 'react-native';
import { Button, Text } from 'react-native-paper';
import { DatePickerModal } from 'react-native-paper-dates';
import { format } from 'date-fns';

interface DateTimePickerProps {
  date: Date;
  onDateChange: (date: Date) => void;
}

const DateTimePicker: React.FC<DateTimePickerProps> = ({ date, onDateChange }) => {
  const [visible, setVisible] = useState(false);

  const onConfirm = ({ date }: { date: Date }) => {
    onDateChange(date);
    setVisible(false);
  };

  return (
    <View>
      <Text variant="titleMedium" style={{ marginBottom: 8, color: '#EC4899' }}>
        Choose Your Special Date
      </Text>

      <Button mode="outlined" onPress={() => setVisible(true)} style={{ borderColor: '#F472B6' }}>
        {date ? format(date, 'yyyy-MM-dd') : 'Select a date'}
      </Button>

      <DatePickerModal
        locale="en"
        mode="single"
        visible={visible}
        onDismiss={() => setVisible(false)}
        date={date}
        onConfirm={onConfirm}
      />
    </View>
  );
};

export default DateTimePicker;