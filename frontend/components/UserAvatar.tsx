import {axiosClient} from "../services/client";
import {Image, StyleSheet, useColorScheme, View} from "react-native";
import {useAuth} from "../context/AuthProvider";
import Colors from "../constants/Colors";

interface UserAvatarProps {
    userId: string;
    size?: number;
}

/**
 * The UserAvatar function is a TypeScript React component that displays a user's avatar image based on
 * their userId, with an optional size parameter.
 * @param {UserAvatarProps}  - - `userId`: The ID of the user for whom the avatar is being displayed.
 * @returns an `<Image>` component with a source that includes a URI for fetching the user's avatar
 * image. The source includes headers for authorization and specifies the image format as PNG. The
 * style of the image is determined by the `makeStyle.picture` style object and the `size` prop.
 */
export default function UserAvatar({userId, size = 84}: UserAvatarProps) {
    const colorScheme = useColorScheme() ?? "light";
    const makeStyle = styles(Colors[colorScheme]);


    const {accessToken} = useAuth();
    return (
        <Image source={{
            uri: axiosClient.defaults.baseURL + "/employees/" + userId + "/image", method: "GET",
            headers: {
                Accept: "image/png",
                "X-Group-Authorization": process.env.EXPO_PUBLIC_API_TOKEN ?? "",
                Authorization: "Bearer " + accessToken,
            }
        }} style={[makeStyle.picture, {width: size, height: size}]} />
    );
}

const styles = (color: any) => StyleSheet.create({
    picture: {
        borderRadius: 100,
    }
});