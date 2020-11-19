import styled from 'styled-components';
import {shade} from 'polished';

export const Container = styled.div`
    margin-top: 24px;
    background: #FFF;
    border-radius: 10px;
    color: #777;
`
export const customStyles = {

    option: (provided: any, state: any) => ({
      ...provided,
      borderBottom: '1px dotted pink',
      color: state.isSelected ? '#FFF' : '#777',
      padding: 16,
      width: "100%",
      background: state.isSelected ? '#FF9000' : '#FFF' ,
    }),
    control: (provided: any, state: any) => ({
        ...provided,
        width: "100%",
        padding: 12,
        borderRadius: "10px",
        borderColor: '#FF9000',
    })
}
