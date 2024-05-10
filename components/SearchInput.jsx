import { View, Text, TouchableOpacity, TextInput, Image } from 'react-native'
import {icons} from '../constants'
const SearchInput = ({ title, value, placeholder, handleTextChange, otherStyles, ...props }) => {
    return (
        <View className="w-full h-16 px-4 bg-black-100 border-black-200 rounded-2xl focus:border-secondary items-center flex-row space-x-4">
            <TextInput className=" text-white font-pre mtgular-0.5 text-base flex-1 "
                placeholder={placeholder}
                placeholderTextColor="#7b7b8B"
                value={value}
                onChangeText={handleTextChange}
                secureTextEntry={title === "Password" && !showPassword}
            />
            <TouchableOpacity>
                    <Image
                      source={icons.search}
                      className="w-5 h-5"
                      resizeMode='contain'
                    />
            </TouchableOpacity>

            
        </View>
    )
}

export default SearchInput