import {Image} from "react-native";
import React from "react";

interface Props extends React.ComponentProps<typeof Image> {
    url: string;
}

const ImageView = ({ url, ...rest } : Props) => {
    return (
        <Image 
            source={{ uri: url }}
            {...rest}
        />
    );
}

export default ImageView;