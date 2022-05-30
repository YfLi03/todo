import React from 'react'
import DailyScreen from './screens/daily.js'
import { SafeAreaView,StyleSheet} from 'react-native';
import { getDateID } from './funcs/getAsyncId.js';

  


export default function App() {

  return (
    <SafeAreaView style={styles.container}>     
      
      <DailyScreen date={getDateID(new Date())}/>
      
    </SafeAreaView>
    //use {} to include javascript code
    //JSX need "React"
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
});
