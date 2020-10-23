import { SafeAreaView, View } from 'react-native'
import {Button, Ima, TextInput} from 'react-native-paper'

const styles = StyleSheet.create({

});

export default class signup extends React.Component {
    render(){
        return(
            <SafeAreaView>
                <View>
                    <Image style={styles.icon}
                            source={require('./assets/icon.png')}
                            >
                    </Image>
                    <TextInput>

                    </TextInput>
                    <TextInput>

                    </TextInput>
                    <View>
                        <TextInput>

                        </TextInput>
                        <Button>

                        </Button>
                    </View>
                    <Button>

                    </Button>
                    <Button>

                    </Button>
                </View>
            </SafeAreaView>
        )
    }
}