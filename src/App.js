
import Content from './Content';
import Footer from './Footer';
import Header from './Header';
import TodoListContent from './TodoListContent'

function App() {

   return (
    <div className="App">      
        <Header/>
        {/* <Content></Content> */}
        <TodoListContent></TodoListContent>
        <Footer></Footer>
    </div>
  );
}

export default App;