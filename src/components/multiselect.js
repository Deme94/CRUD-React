import React from 'react';
import Select from 'react-select';

export default function MultiSelect(props) {
    const options = props.options.map((option, i) => ({ value: { option }.option, label: { option }.option }))
    const selected = props.selected.map((sel, i) => ({ value: { sel }.sel, label: { sel }.sel }))
    return (
        <Select defaultValue={selected} options={options} isMulti />
    );
}