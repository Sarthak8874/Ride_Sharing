// import { Container, Row, Col, Tab, Nav } from "react-bootstrap";
// import ProjectCard  from "./ProjectCard";
// import TrackVisibility from 'react-on-screen';
// // import "./OurServices.css";



// const OurServices = () => {

//     const projects = [
//       {
//         title: "Female Drivers",
//         description: "Available on request to make your rides safe at odd hours",
//         // imgUrl: projImg1,
//       },
//       {
//         title: "Student Benefits",
//         description: "We can't help you with coursework, but with a valid ID, your travel is made easy.",
//         // imgUrl: projImg2,
//       },
//       {
//         title: "Maximum Security",
//         description: "Blockchain Technology ensures maximum data privacy for our users.",
//         // imgUrl: projImg3,
//       },
//     ];

//     const vehiclesdescription = [
//       {
//         title: "Well-Equipped Navigation System",
//         description: "To ensure you reach your destinations on time.",
//         // imgUrl: projImg6,
//       },
//       {
//         title: "Spacious",
//         description: "..or not, if you're a party of 2. Our vehicles comfortably fit any number of people.",
//         // imgUrl: projImg5,
//       },
//       {
//         title: "Well-Maintained",
//         description: "Comfortable rides on the worst of roads are ensured.",
//         // imgUrl: projImg4,
//       },
//     ];

//     return (
//       <section className="project" id="project">
//         <Container>
//           <Row>
//             <Col size={12}>
//               <TrackVisibility>
//                 {({ isVisible }) =>
//                 <div className={isVisible ? "animate__animated animate__fadeIn": ""}>
//                   <h2>Our Services</h2>
//                   <p>What makes us so different from other services?</p>
//                   <Tab.Container id="projects-tabs" defaultActiveKey="first">
//                     <Nav variant="pills" className="nav-pills mb-5 justify-content-center align-items-center" id="pills-tab">
//                       <Nav.Item>
//                         <Nav.Link eventKey="first" style={{fontWeight:'700',color:"white"}}>Features</Nav.Link>
//                       </Nav.Item>
//                       <Nav.Item>
//                         <Nav.Link eventKey="second"  style={{fontWeight:'700',color:"white"}}>Vehicles Available</Nav.Link>
//                       </Nav.Item>
//                       <Nav.Item>
//                         <Nav.Link eventKey="third" style={{fontWeight:'700',color:"white"}}>Offers Available</Nav.Link>
//                       </Nav.Item>
//                     </Nav>
//                     <Tab.Content id="slideInUp" className={isVisible ? "animate__animated animate__slideInUp" : ""}>
//                       <Tab.Pane eventKey="first">
//                         <Row>
//                           {
//                             projects.map((project, index) => {
//                               return (
//                                 <ProjectCard
//                                   key={index}
//                                   {...project}
//                                   />
//                               )
//                             })
//                           }
//                         </Row>
//                       </Tab.Pane>
//                       <Tab.Pane eventKey="second">
//                       <p>Wide range of vehicles, suited for everyone, everyday.</p>
//                       <Row>
//                       {


//                         vehiclesdescription.map((project, index) => {
//                           return (
//                             <ProjectCard
//                               key={index}
//                               {...project}
//                               />
//                           )
//                         })

//                       }      

//                         </Row>
//                       </Tab.Pane>
//                       <Tab.Pane eventKey="third">
//                         <p>As a member of our carpooling network, you'll have access to an extensive network of verified drivers and passengers. Say goodbye to long commutes and hello to a more efficient and eco-friendly way of traveling. Our advanced matching algorithm intelligently connects you with compatible carpool partners, ensuring a seamless and comfortable ride every time.</p>
//                       </Tab.Pane>
//                     </Tab.Content>
//                   </Tab.Container>
//                 </div>}
//               </TrackVisibility>
//             </Col>
//           </Row>
//         </Container>
//         {/* <img className="background-image-right" src={colorSharp2}></img> */}
//       </section>
//     )
//   }

//   export default OurServices;












"use client";

import Image from "next/image";
import React from "react";
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";
import Link from "next/link";

function OurServices() {
    return (
        <div>
            <CardContainer className="inter-var">
                <CardBody className="bg-gray-50 relative group/card  dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[30rem] h-auto rounded-xl p-6 border  ">
                    <CardItem
                        translateZ="50"
                        className="text-xl font-bold text-neutral-600 dark:text-white"
                    >
                        Female Drivers
                    </CardItem>
                    <CardItem
                        as="p"
                        translateZ="60"
                        className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300"
                    >
                        Available on request to make your rides safe at odd hours
                    </CardItem>
                    <CardItem translateZ="100" className="w-full mt-4">
                        <Image
                            src="/Images/person-service.png"
                            height="1000"
                            width="1000"
                            className="h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl"
                            alt="thumbnail"
                        />
                    </CardItem>
                    <div className="flex justify-between items-center mt-20">
                        <CardItem
                            translateZ={20}
                            as={Link}
                            href="https://twitter.com/mannupaaji"
                            target="__blank"
                            className="px-4 py-2 rounded-xl text-xs font-normal dark:text-white"
                        >
                            Try now →
                        </CardItem>
                        <CardItem
                            translateZ={20}
                            as="button"
                            className="px-4 py-2 rounded-xl bg-black dark:bg-white dark:text-black text-white text-xs font-bold"
                        >
                            Sign up
                        </CardItem>
                    </div>
                </CardBody>
            </CardContainer>
        </div>
    )
}

export default OurServices