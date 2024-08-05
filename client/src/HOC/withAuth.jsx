// import { useAuthContext } from "../contexts/AuthContext";

export default function withAuth(component) {
    const ComponentWrapper = (props) => {
        // const authContext = useAuthContext();

        return <Comment {...props} />
    };

    return ComponentWrapper;
};