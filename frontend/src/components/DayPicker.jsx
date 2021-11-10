import React from 'react'
import 'react-day-picker/lib/style.css';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import { DateUtils } from 'react-day-picker';
import dateFnsFormat from 'date-fns/format';
import dateFnsParse from 'date-fns/parse';
import PropTypes from 'prop-types';

function DayPicker ({ setDate }) {
  const FORMAT = 'dd/MM/yyyy';
  function parseDate (str, format, locale) {
    const parsed = dateFnsParse(str, format, new Date(), { locale });
    if (DateUtils.isDate(parsed)) {
      return parsed;
    }
    return undefined;
  }

  function formatDate (date, format, locale) {
    setDate(date.toISOString())
    return dateFnsFormat(date, format, { locale });
  }

  return (
    <DayPickerInput
        overlayComponent={CustomOverlay}
        formatDate={formatDate}
        format={FORMAT}
        parseDate={parseDate}
        placeholder={`${dateFnsFormat(new Date(), FORMAT)}`}
        inputProps={
          { required: true }
        }
    />
  )
}

export default DayPicker

DayPicker.propTypes = {
  setDate: PropTypes.func
};

function CustomOverlay ({ classNames, selectedDay, children, ...props }) {
  return (
    <div
      className="bg-white absolute bottom-12 mb-9 animate-fadeUp"
      {...props}
    >
      {children}
    </div>
  );
}

CustomOverlay.propTypes = {
  classNames: PropTypes.object.isRequired,
  selectedDay: PropTypes.instanceOf(Date),
  children: PropTypes.node.isRequired,
};
