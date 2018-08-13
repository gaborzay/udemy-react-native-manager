import React, {Component} from 'react';
import {Picker, Text} from 'react-native';
import {connect} from 'react-redux';
import {employeeUpdate, employeeCreate} from "../actions";
import {Card, CardSection, Input, Button} from "./common";

class EmployeeCreate extends Component {
    daysOfTheWeek = [
        {label: "Monday"},
        {label: "Tuesday"},
        {label: "Wednesday"},
        {label: "Thursday"},
        {label: "Friday"},
        {label: "Saturday"},
        {label: "Sunday"},
    ];

    printDaysOfTheWeek = () => {
        return this.daysOfTheWeek.map(day => (
            <Picker.Item key={day.label} label={day.label} value={day.label}/>
        ));
    };

    onButtonPress() {
        const {name, phone, shift} = this.props;

        this.props.employeeCreate({name, phone, shift: shift || 'Monday'});
    }

    render() {
        return (
            <Card>
                <CardSection>
                    <Input
                        label="Name"
                        placeholder="Jane"
                        value={this.props.name}
                        onChangeText={value => this.props.employeeUpdate({prop: 'name', value})}
                    />
                </CardSection>

                <CardSection>
                    <Input
                        label="Phone"
                        placeholder="555-555-5555"
                        value={this.props.phone}
                        onChangeText={value => this.props.employeeUpdate({prop: 'phone', value})}
                    />
                </CardSection>

                <CardSection style={{ flexDirection: 'column' }}>
                    <Text style={styles.pickerTextStyle}>Shift</Text>
                    <Picker
                        selectedValue={this.props.shift}
                        onValueChange={value => this.props.employeeUpdate({prop: 'shift', value})}
                    >
                        {this.printDaysOfTheWeek()}
                    </Picker>
                </CardSection>

                <CardSection>
                    <Button onPress={this.onButtonPress.bind(this)}>
                        Create
                    </Button>
                </CardSection>
            </Card>
        );
    }
}

const styles = {
    pickerTextStyle: {
        fontSize: 18,
        paddingLeft: 20
    }
};

const mapStateToProps = (state) => {
    const {name, phone, shift} = state.employeeForm;

    return {name, phone, shift};
};

export default connect(mapStateToProps, {
    employeeUpdate,
    employeeCreate
})(EmployeeCreate);