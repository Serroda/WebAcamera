export const useAnimations = () => {

    function initTransition() {
        //@ts-ignore
        if (document.startViewTransition) {
            //@ts-ignore
            document.startViewTransition()
        }
    }

    return {initTransition}
}