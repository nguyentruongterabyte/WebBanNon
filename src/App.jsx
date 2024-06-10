import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { privateRoutes, publicRoutes } from './routes';
import { DefaultLayout } from './layouts';
import { Fragment } from 'react';
import PersistLogin from './components/PersistLogin';
import RequireAuth from './components/RequireAuth';
import Error from './components/Error';

const App = () => {
    const customerId = 24;


  return (
    
  
  


    // <div>
    //   <Router>
    //     <NavbarCustomer />
    //     <Routes>
    //       <Route path="/home" element={<Home />} />
    //       <Route path="/product" element={<ProductManager />} />
    //       <Route path="/customer" element={<CustomerManager />} />
    //       <Route path="/order/history/:customerId" element={<OrderHistory />} />
    //       <Route path="/product-list" element={<ProductList />} />
    //       <Route path="/product/:id" element={ <ProductDetail /> } />
    //       <Route path="/login" element={<Login/>} />
    //     </Routes>
    //   </Router>
    //   <ToastContainer
    //     position="top-right"
    //     autoClose={5000}
    //     hideProgressBar={false}
    //     newestOnTop={false}
    //     closeOnClick
    //     rtl={false}
    //     pauseOnFocusLoss
    //     draggable
    //     pauseOnHover
    //     theme="light"
    //   />
    // </div>

    

    <div className="app">
      <Router>
        <Routes>
          {/* public routes */}
          {publicRoutes.map((route, index) => {
            let Layout = DefaultLayout;
            if (route.layout) {
              Layout = route.layout;
            } else if (route.layout === null) {
              Layout = Fragment;
            }

            const Page = route.component;
            return (
              <Route
                key={index}
                path={route.path}
                element={
                  <Layout>
                    <Page />
                  </Layout>
                }
              />
            );
          })}

          {/*We want to protect these routes*/}
          <Route element={<PersistLogin />}>
            {privateRoutes.map((route, index) => {
              let Layout = DefaultLayout;
              if (route.layout) {
                Layout = route.layout;
              } else if (route.layout == null) {
                Layout = Fragment;
              }

              const Page = route.component;

              return (
                <Route key={index} element={<RequireAuth allowedRoles={route.allowedRoles} />}>
                  <Route
                    path={route.path}
                    element={
                      <Layout>
                        <Page />
                      </Layout>
                    }
                  />
                </Route>
              );
            })}
          </Route>

          {/* Catch all */}
          <Route path="*" element={<Error />} />
        </Routes>
      </Router>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
};

export default App;
