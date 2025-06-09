import { StyleSheet } from 'react-native';

const EducationStyle = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    container: {
        padding: 20,
        paddingTop: 75,
        paddingBottom: 50,
    },
    header: {
        fontSize: 34,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#2a86ff',
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 20,
        textAlign: 'center',
        color: '#666',
        marginBottom: 30,
    },
    section: {
        backgroundColor: '#fff',
        borderRadius: 15,
        marginBottom: 20,
        paddingVertical: 20,
        paddingHorizontal: 15,
        height: 150,
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 5,
    },
    sectionHeader: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    sectionTitle: {
        flex: 1,
        fontSize: 25,
        fontWeight: '600',
        marginLeft: 15,
        color: '#333',
    },
    button: {
        backgroundColor: '#2a86ff',
        padding: 20,
        marginTop: 25,
        borderRadius: 10,
        alignSelf: 'center',
        width: '60%',
    },
    buttonText: {
        fontSize: 20,
        color: '#fff',
        textAlign: 'center',
        fontWeight: '600',
    },
});

const EducationDetailStyle = StyleSheet.create({
    container: {
        padding: 20,
        paddingTop: 50,
        paddingBottom: 50,
        backgroundColor: '#fff',
        flexGrow: 1,
        justifyContent: 'flex-start',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingRight: 25,
        paddingLeft: 35,
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        marginLeft: 15,
        color: '#333',
    },
    content: {
        fontSize: 20,
        lineHeight: 30,
        //color: '#444',
        marginBottom: 40,
        paddingTop: 20,
    },
    button: {
        backgroundColor: '#2a86ff',
        padding: 20,
        marginTop: 25,
        borderRadius: 10,
        alignSelf: 'center',
        width: '60%',
    },
    buttonText: {
        fontSize: 20,
        color: '#fff',
        textAlign: 'center',
        fontWeight: '600',
    },
});

const AnticoagulantEducationStyle = StyleSheet.create({
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        marginTop: 20,
        color: '#003366',
    },
    subtitle: {
        fontSize: 25,
        fontWeight: '600',
        marginTop: 10,
        color: '#333',
        textAlign: 'justify'
    },
    text: {
        fontSize: 22,
        lineHeight: 24,
        color: '#444',
        marginTop: 10,
        textAlign: 'justify'
    },
    bullet: {
        fontSize: 22,
        marginLeft: 10,
        marginTop: 6,
        color: '#444',
    },
    warningBullet: {
        fontSize: 20,
        color: '#d32f2f', // Rojo oscuro para alertas
        fontWeight: '600',
        marginVertical: 4,
        marginLeft: 10,
        paddingLeft: 15,
        borderLeftWidth: 3,
        borderLeftColor: '#ff5252', // Rojo más claro para el borde
        backgroundColor: '#ffebee', // Fondo rojo muy claro
        paddingVertical: 6,
        paddingRight: 10,
        borderRadius: 4,
        marginRight: 15,
    },
    footer: {
        fontSize: 22,
        marginTop: 30,
        fontWeight: '600',
        color: '#005c2d',
        textAlign: 'justify',
    }
});

export {
    EducationStyle,
    EducationDetailStyle,
    AnticoagulantEducationStyle
};