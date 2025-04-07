import { View, StyleSheet } from "react-native"

type ProgressBarProps = {
    progress: number;
    barLength: number;
}

const ProgressBar = ({progress, barLength} : ProgressBarProps) => {
    return (
        <View style={[styles.progress_bar_container, {width: `${barLength}%`}]} >
            <View style={[styles.progress_bar_fill, {width: `${progress}%`}]} />
        </View>
    )
}

export default ProgressBar;

const styles = StyleSheet.create({
    progress_bar_container: {
        position: 'relative',
        backgroundColor: '#EFEFEF',
        borderRadius: '0.8rem',
        height: 10
    },
    progress_bar_fill: {
        position: 'absolute',
        backgroundColor: '#FCAD72',
        borderRadius: '0.8rem',
        height: '100%',
        left: 0
    }
})