import React from 'react';
import TextField from '../../text-field';
import Autocomplete, { createFilterOptions } from '@material-ui/lab/Autocomplete';
import {getJson} from '@fay-react/lib/fetch';
import {PersonType} from './index';
import {getErrorMessage} from "@/lib/fetch-error";
import UsernameChip from '../../chips/user-chip';
import {getLocale} from "./locale";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";

interface Props {
  label?: string,
  className?: string,
  placeholder?: string,
  max?: number,
  min?: number,
  disabled?: boolean,
  defaultValue?: PersonType[],
  onChange: (value: PersonType[]) => void
}

export default ({
  className, label, disabled=false, defaultValue=[],
  placeholder, onChange, max, min
}: Props) => {
  const locale = getLocale();
  const [loading, setLoading] = React.useState(false);
  const [data, setData] = React.useState([]);
  const [value, setValue] = React.useState(defaultValue);

  React.useEffect(() => {
    setLoading(true);
    getJson({path: baseUrl.malygos() + '/organizationMembers?type=all&name='}).then(res => {
      if(res.status === 0){
        const members = res.members;
        const selectedMemberIds = defaultValue.map((v: PersonType)=>v.id);
        const selectedMembers = members.filter((member: PersonType) => selectedMemberIds.includes(member.id));
        setValue(selectedMembers);
        setData(res.members);
      }else{
        getErrorMessage(res).then((_errorMsg) => {
          // error
        });
      }
      setLoading(false);
    })
  }, []);

  const handleChange = (_e: object, v: any[]) => {
    if(!((max && v.length > max) || (min && v.length < min)) && !v.includes(undefined)){
      setValue(v);
    }
  };

  React.useEffect(() => {
    onChange && onChange(value);
  }, [JSON.stringify(value)]);

  const filterOptions = createFilterOptions({
    matchFrom: 'any',
    stringify: (option: PersonType) => option.name,
  });

  return (
    <Autocomplete
      multiple
      popupIcon={<KeyboardArrowDownIcon/>}
      className={className}
      disabled={disabled}
      options={data}
      getOptionLabel={(option: PersonType) => option.name}
      value={value}
      filterSelectedOptions
      filterOptions={filterOptions}
      renderTags={(v: PersonType[], getTagProps) =>
        v.map((option: PersonType, index: number) => (
            <UsernameChip key={index} username={option.name} disabled={disabled} {...getTagProps({ index })} />
          )
        )
      }
      loading={loading}
      onChange={handleChange}
      noOptionsText={locale.noOptionsText}
      renderInput={(params:any) => (
        <TextField
          {...params}
          label={label}
          placeholder={placeholder}
          disabled={disabled}
          margin="normal"
          fullWidth
        />
    )}
    />
  );
}
