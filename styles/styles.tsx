import { StyleSheet, Dimensions, Platform } from 'react-native';

const { width, height } = Dimensions.get('window');

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF8F0', // Soft background color
  },
  scrollContainer: {
    padding: 20,
    alignItems: 'center',
  },
  notificationContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFEBE5',
    borderRadius: 12,
    padding: 12,
    alignItems: 'center',
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  notificationIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  notificationContent: {
    flex: 1,
    marginLeft: 12,
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#D6336C',
    marginBottom: 4,
  },
  notificationText: {
    fontSize: 14,
    color: '#555',
  },
  notificationTime: {
    fontSize: 12,
    color: '#999',
    marginLeft: 10,
  },
  notificationSubtext: {
    fontSize: 12,
    color: '#888',
    marginTop: 8,
    alignSelf: 'flex-start',
  },
  coupleName: {
    fontSize: 24,
    fontWeight: '800',
    color: '#D6336C',
    marginVertical: 20,
    textAlign: 'center',
  },
  TextBelow: {
    marginTop: 5,
    fontSize: 16,
    fontWeight: '800',
    color: '#D6336C',
    marginBottom: 5,
    textAlign: 'center',
  },
  elogioText: {
    fontSize: 20,
    fontStyle: 'italic',
    color: '#555',
    textAlign: 'center',
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  noElogioText: {
    fontSize: 16,
    color: '#888',
    textAlign: 'center',
    marginBottom: 20,
  },
  image: {
    width: width > 768 ? width * 0.6 : width - 40,  // Ajuste para telas maiores
    height: width > 768 ? (width * 0.6) * 1.2 : (width - 40) * 1.2,
    borderRadius: 16,
    marginBottom: 20,
    resizeMode: 'cover',
    padding: 20,
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 20,

  },
  noImageText: {
    fontSize: 16,
    color: '#888',
    textAlign: 'center',
    marginBottom: 20,
  },
  elapsedTimeContainer: {
    alignItems: 'center',
    backgroundColor: '#FFE8E8',
    padding: 20,
    borderRadius: 12,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginBottom: 20,
  },
  elapsedTimeTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#D6336C',
    marginBottom: 8,
  },
  elapsedTime: {
    fontSize: 16,
    color: '#555',
  },
  codeInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  TextcodeInput: {
    borderWidth: 1,
    borderColor: '#D6336C',
    borderRadius: 8,
    padding: 10,
    width: 250, // Largura fixa de 250 pixels
    marginRight: 10,
    backgroundColor: '#FFE8E8',
    color: '#555',
    fontWeight: 'bold',
  },
  copyText: {
    color: 'blue', // Color for the copied text
    textDecorationLine: 'underline', // Underline to indicate it's clickable
    marginTop: 10, // Space between elements
  },
  linkText: {
    color: 'green', // Color for the link text
    marginTop: 10, // Space between elements
  },
  toggleButton: {
    padding: 10,
    backgroundColor: '#D6336C',
    borderRadius: 8,
    marginRight: 10,
  },
  toggleButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
  submitButton: {
    padding: 10,
    backgroundColor: '#D6336C',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButton: {
    padding: 10,
    backgroundColor: 'red', // Customize as needed
    alignItems: 'center',
    borderRadius: 5,
    margin: 20,
  },
  closeButtonText: {
    color: 'white', // Customize text color
    fontWeight: 'bold',
  },
});

export default styles;
