import React, { useState } from 'react';
import { Switch, StyleSheet, TouchableOpacity, Alert, ActivityIndicator, FlatList, Text } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { Picker } from '@react-native-picker/picker';  // Use the new package for Picker
import DateTimePicker from '@react-native-community/datetimepicker';  // Cross-platform DatePicker
import { ProgressBar } from 'react-native-paper';  // Cross-platform ProgressBar

const App = () => {
  const [isEnabled, setIsEnabled] = useState(false);
  const [selectedValue, setSelectedValue] = useState("java");
  const [progress, setProgress] = useState(0);
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  // Función para cambiar el estado del interruptor
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  // Función para cambiar el valor del Picker
  const handlePickerChange = (itemValue) => {
    setSelectedValue(itemValue);
  };

  // Función para mostrar el DatePicker
  const onDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setDate(selectedDate);
      Alert.alert('Fecha seleccionada', selectedDate.toLocaleDateString());
    }
  };

  // Función para simular el progreso
  const simulateProgress = () => {
    if (progress < 100) {
      setTimeout(() => setProgress(progress + 10), 500);
    }
  };

  // Función para renderizar los items de la lista
  const renderItem = ({ item }) => (
    <Text style={styles.listItem}>{item}</Text>
  );

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        
        {/* FlatList como contenedor principal */}
        <FlatList
          data={['Item 1', 'Item 2', 'Item 3']}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          ListHeaderComponent={
            <>
              {/* Switch para alternar entre dos estados */}
              <Switch
                trackColor={{ false: '#767577', true: '#81b0ff' }}
                thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
                ios_backgroundColor="#3e3e3e"
                onValueChange={toggleSwitch}
                value={isEnabled}
              />
              
              {/* TouchableOpacity para crear un botón interactivo */}
              <TouchableOpacity style={styles.button} onPress={() => Alert.alert("¡Botón presionado!")}>
                <Text style={styles.buttonText}>Presiona aquí</Text>
              </TouchableOpacity>

              {/* ActivityIndicator para mostrar un indicador de carga */}
              <ActivityIndicator size="large" color="#007BFF" style={styles.spinner} />

              {/* Picker para seleccionar un valor */}
              <Picker
                selectedValue={selectedValue}
                style={styles.picker}
                onValueChange={handlePickerChange}
              >
                <Picker.Item label="loona" value="LOONA" />
                <Picker.Item label="newjeans" value="NJS" />
                <Picker.Item label="twice" value="TWICE" />
              </Picker>

              {/* DateTimePicker para seleccionar una fecha */}
              <TouchableOpacity style={styles.button} onPress={() => setShowDatePicker(true)}>
                <Text style={styles.buttonText}>Selecciona una fecha</Text>
              </TouchableOpacity>

              {showDatePicker && (
                <DateTimePicker
                  value={date}
                  mode="date"
                  display="default"
                  onChange={onDateChange}
                />
              )}

              {/* ProgressBar para mostrar el progreso */}
              <ProgressBar progress={progress / 100} style={styles.progressBar} />
              <TouchableOpacity style={styles.button} onPress={simulateProgress}>
                <Text style={styles.buttonText}>Simular Progreso</Text>
              </TouchableOpacity>
            </>
          }
          ListFooterComponent={
            <Text style={styles.text}>
              {/* Información descriptiva de los componentes */}
              <Text style={styles.subheading}>SafeAreaProvider: </Text>
              SafeAreaProvider es un proveedor de contexto que se usa para envolver toda tu aplicación y permitir que los componentes hijos accedan a la información de las áreas seguras del dispositivo.{'\n\n'}

              <Text style={styles.subheading}>SafeAreaView: </Text>
              SafeAreaView es un componente que se utiliza para envolver partes específicas de la interfaz de usuario, asegurando que estas no se solapen con las áreas no utilizables del dispositivo.{'\n\n'}

              <Text style={styles.subheading}>Switch: </Text>
              Switch es un componente interactivo que permite a los usuarios alternar entre dos estados. En este caso, se usa para cambiar el valor de una variable de estado.{'\n\n'}

              <Text style={styles.subheading}>useState: </Text>
              useState es un hook de React que se usa para manejar el estado dentro de los componentes funcionales.{'\n\n'}

              <Text style={styles.subheading}>FlatList: </Text>
              FlatList es un componente que renderiza listas de datos de manera eficiente. Solo renderiza los elementos visibles, lo que mejora el rendimiento cuando se tiene una lista grande.{'\n\n'}

              <Text style={styles.subheading}>ActivityIndicator: </Text>
              ActivityIndicator es un componente que muestra un "spinner" o indicador de carga. Se usa para mostrar que una tarea está en proceso.{'\n\n'}

              <Text style={styles.subheading}>TouchableOpacity: </Text>
              TouchableOpacity es un componente interactivo que cambia la opacidad del componente cuando se toca. Al tocar el componente, se ejecuta el evento definido en `onPress`.{'\n\n'} 

              <Text style={styles.subheading}>Picker: </Text>
              Picker es un componente utilizado para seleccionar un valor de una lista de opciones. Es útil cuando se tiene un conjunto limitado de elementos a elegir.{'\n\n'}

              <Text style={styles.subheading}>DateTimePicker: </Text>
              DateTimePicker es un componente que permite seleccionar una fecha o una hora de manera visual. Este componente es compatible tanto con Android como con iOS.{'\n\n'}

              <Text style={styles.subheading}>ProgressBar: </Text>
              ProgressBar es un componente que muestra el progreso de una tarea o proceso. Su valor se actualiza para reflejar el avance en una tarea de larga duración.{'\n\n'}
            </Text>
          }
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  text: {
    marginTop: 20,
    fontSize: 16,
    color: '#333',
    textAlign: 'left',
    marginBottom: 20,
  },
  subheading: {
    fontWeight: 'bold',
    color: '#007BFF',
    fontSize: 18,
  },
  button: {
    backgroundColor: '#007BFF',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 8,
    marginVertical: 20,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  spinner: {
    marginVertical: 20,
  },
  listItem: {
    padding: 10,
    fontSize: 16,
    backgroundColor: '#f1f1f1',
    marginVertical: 5,
    borderRadius: 5,
  },
  picker: {
    width: 200,
    height: 50,
    marginVertical: 20,
  },
  progressBar: {
    width: 200,
    marginVertical: 20,
  },
});

export default App;
