-- SQL script to insert content into web-content table
-- Run this in Supabase SQL Editor

-- First, ensure the table has the right structure
CREATE TABLE IF NOT EXISTS "web-content" (
  id SERIAL PRIMARY KEY,
  "contentId" TEXT NOT NULL UNIQUE,
  text TEXT[] NOT NULL,
  image TEXT
);

-- Clear existing data if needed (uncomment to use)
-- DELETE FROM "web-content";

-- Insert all content
INSERT INTO "web-content" ("contentId", text, image)
VALUES
  ('home-hero-heading', ARRAY['Smart Automation Solutions for Industry Excellence'], NULL),
  
  ('home-hero-subheading', ARRAY['Delivering innovative industrial automation solutions and special-purpose machines that empower businesses to achieve efficiency, precision, and reliability.'], NULL),
  
  ('home-services-heading', ARRAY['Our Services'], NULL),
  
  ('home-services-subheading', ARRAY['We offer a comprehensive range of automation solutions tailored to your specific needs.'], NULL),
  
  ('home-section3-heading', ARRAY['Delivering Excellence in Industrial Automation'], NULL),
  
  ('home-section3-subheading', ARRAY['At Elextrio Automation, we specialize in providing cutting-edge industrial automation solutions and custom-built special-purpose machines. Our focus is on delivering value-driven, efficient, and innovative systems tailored to the unique needs of our clients.'], NULL),
  
  ('home-section3-points', ARRAY[
    'Small to medium-scale projects delivered within six months',
    'Cutting-edge technology and innovative solutions',
    'Focus on simplicity and maintainability',
    'Customer-centric approach with long-term partnerships',
    'Precision engineering and adaptability'
  ], NULL),
  
  ('home-image1-heading', ARRAY['Transform Your Manufacturing Process'], NULL),
  
  ('home-image1-subheading', ARRAY['Our cutting-edge automation solutions deliver measurable results: increased efficiency, enhanced precision, and unmatched reliability for forward-thinking manufacturers.'], NULL),
  
  ('about-hero-heading', ARRAY['About ELextrio'], NULL),
  
  ('about-hero-subheading', ARRAY['Pioneering innovation in industrial automation since 2005'], NULL),
  
  ('about-story-heading', ARRAY['Our story'], NULL),
  
  ('about-story-subheading', ARRAY[
    'At Elextrio Automation, we specialize in providing cutting-edge industrial automation solutions and custom-built special-purpose machines.',
    'Our focus is on delivering value-driven, efficient, and innovative systems tailored to the unique needs of our clients. With expertise in handling small to medium-scale projects, we strive to deliver solutions that are not only reliable but also implementable within six months of project initiation.',
    'Our commitment to utilizing the latest technologies ensures our clients benefit from advanced, future-ready systems that enhance productivity and efficiency. At the core of Elextrio Automation is a belief in simplicity and maintainability, aligning with our vision to deliver smart automation solutions that are easy to operate and maintain.',
    'We pride ourselves on building long-term partnerships with our clients by exceeding expectations through precision engineering, adaptability, and a customer-centric approach. Driven by a team of dedicated professionals, we aim to revolutionize the manufacturing landscape by integrating technology with innovation.'
  ], NULL),
  
  ('about-mission-main-heading', ARRAY['Mission and vision'], NULL),
  
  ('about-mission-main-subheading', ARRAY['Guided by our core principles, we strive to deliver excellence in every project.'], NULL),
  
  ('about-mission-heading', ARRAY['Our Mission'], NULL),
  
  ('about-mission-subheading', ARRAY[
    'To deliver smart, reliable, and maintenance-friendly automation solutions that empower seamless business operations. We are dedicated to transforming challenges into tailored solutions by leveraging cutting-edge technology and a deep understanding of our clients'' unique needs.',
    'Our commitment is to provide small to medium-sized projects that bring measurable value within six months of initiation, ensuring rapid impact and tangible results for our clients. With a focus on quality and sustainability, we strive to simplify complex processes, making smart automation systems that are not only efficient but also intuitive to maintain and operate.'
  ], NULL),
  
  ('about-vision-heading', ARRAY['Our vision'], NULL),
  
  ('about-vision-subheading', ARRAY[
    'We aim to be the trusted partner in industrial automation by delivering solutions that enable our clients to stay competitive in an ever-evolving market. Through our expertise, agility, and unwavering dedication to customer satisfaction, we help businesses seamlessly integrate automation into their operations.',
    'By bridging the gap between advanced technology and user-friendly systems, we aspire to create long-lasting partnerships and drive the success of our clients, one project at a time. Our vision is to lead the industry in creating automation solutions that are not just technologically advanced but also accessible and practical for everyday use.'
  ], NULL),
  
  ('about-values-heading', ARRAY['Our Core Values'], NULL),
  
  ('about-values-subheading', ARRAY['These principles guide our actions and decisions every day.'], NULL),
  
  ('about-values-integrity', ARRAY['We conduct our business with honesty, transparency, and ethical practices, building trust with our clients and partners.'], NULL),
  
  ('about-values-innovation', ARRAY['We continuously seek creative and cutting-edge solutions to address complex automation challenges.'], NULL),
  
  ('about-values-dependability', ARRAY['We are reliable partners who deliver on our promises and stand behind our work with unwavering commitment.'], NULL),
  
  ('about-values-excellence', ARRAY['We strive for the highest standards of quality in every aspect of our solutions and services.'], NULL),
  
  ('about-values-resilience', ARRAY['We approach challenges with determination and adaptability, finding solutions where others see obstacles.'], NULL),
  
  ('about-values-customercentricity', ARRAY['We place our clients'' success and satisfaction at the heart of every decision and action.'], NULL),
  
  ('services-main-heading', ARRAY['Our Services'], NULL),
  
  ('services-main-subheading', ARRAY['Comprehensive automation solutions tailored to your industry needs'], NULL),
  
  ('services-process-heading', ARRAY['Our Process'], NULL),
  
  ('services-process-subheading', ARRAY['We follow a structured approach to deliver successful automation projects.'], NULL),
  
  ('services-process-step1', ARRAY['Consultation', 'We begin by understanding your specific needs, challenges, and objectives through detailed discussions and site visits.'], NULL),
  
  ('services-process-step2', ARRAY['Design & Planning', 'Our team develops a comprehensive solution design, including technical specifications, timelines, and resource requirements.'], NULL),
  
  ('services-process-step3', ARRAY['Implementation', 'We execute the project according to the approved plan, ensuring quality, safety, and adherence to timelines.'], NULL),
  
  ('services-process-step4', ARRAY['Support & Maintenance', 'After deployment, we provide ongoing support, training, and maintenance to ensure optimal system performance.'], NULL),
  
  ('services-industries-heading', ARRAY['Industries We Serve'], NULL),
  
  ('services-industries-subheading', ARRAY['Our automation solutions cater to diverse industrial sectors.'], NULL),
  
  ('services-industries-manufacturing', ARRAY['Manufacturing', 'Automation solutions for various manufacturing sectors, including discrete and process manufacturing.'], NULL),
  
  ('services-industries-automotive', ARRAY['Automotive', 'Specialized automation for automotive component production and assembly operations.'], NULL),
  
  ('services-industries-pharmaceuticals', ARRAY['Pharmaceuticals', 'Precision automation systems compliant with strict regulatory requirements for pharmaceutical production.'], NULL),
  
  ('services-industries-food', ARRAY['Food & Beverage', 'Hygienic automation solutions for food processing, packaging, and quality control.'], NULL),
  
  ('services-industries-electronics', ARRAY['Electronics', 'High-precision automation for electronics manufacturing and assembly processes.'], NULL),
  
  ('services-industries-aerospace', ARRAY['Aerospace', 'Specialized automation solutions meeting the high standards of the aerospace industry.'], NULL),
  
  ('projects-main-heading', ARRAY['Our Projects'], NULL),
  
  ('projects-main-subheading', ARRAY['Explore our portfolio of successful automation implementations'], NULL),
  
  ('projects-categories-heading', ARRAY['Project Categories'], NULL),
  
  ('projects-categories-subheading', ARRAY['Browse our projects by category to find relevant examples for your industry.'], NULL),
  
  ('careers-culture-heading', ARRAY['Our Culture'], NULL),
  
  ('careers-culture-subheading', ARRAY['At Elextrio Automation, we foster a culture of innovation, collaboration, and excellence. We believe that our team is our greatest asset, and we''re committed to creating an environment where everyone can thrive.'], NULL),
  
  ('careers-culture-customercentricity', ARRAY['Customer-Centric Excellence', 'We prioritize customer satisfaction, focusing on details and adding value with every interaction.'], NULL),
  
  ('careers-culture-innovation', ARRAY['Innovation & Growth', 'We challenge the status quo, innovate, and exceed expectations through bold ideas and continuous improvement.'], NULL),
  
  ('careers-culture-collaboration', ARRAY['Collaborative Environment', 'We foster a supportive team atmosphere where diverse perspectives are valued and everyone can contribute to our success.'], NULL),
  
  ('careers-culture-communication', ARRAY['Open Communication', 'We value transparency and direct communication, minimizing assumptions and building trust through clarity.'], NULL),
  
  ('careers-benefits-heading', ARRAY['Why Work With Us'], NULL),
  
  ('careers-benefits-subheading', ARRAY['Join our team and enjoy these benefits while contributing to innovative automation solutions.'], NULL),
  
  ('contact-heading', ARRAY['Contact Us'], NULL),
  
  ('contact-subheading', ARRAY['Get in touch with our team for inquiries and consultations'], NULL),
  
  ('contact-info-heading', ARRAY['Contact Information'], NULL),
  
  ('contact-info-subheading', ARRAY['Reach out to us for any inquiries about our automation solutions or to discuss your specific needs.'], NULL),
  
  ('contact-location-heading', ARRAY['Our Location'], NULL),
  
  ('contact-location-address', ARRAY['No 3 Akrvathi 3rd Block,', 'Dr.Shivaram Karanth Nagar,', 'Sampigehalli, Bengaluru, Karnataka 560077'], NULL),
  
  ('contact-phone-heading', ARRAY['Phone'], NULL),
  
  ('contact-phone-numbers', ARRAY['Main: +1 (555) 123-4567', 'Support: +1 (555) 987-6543'], NULL),
  
  ('contact-email-heading', ARRAY['Email'], NULL),
  
  ('contact-email-addresses', ARRAY['General: info@elextrioautomation.com', 'Support: support@elextrioautomation.com'], NULL),
  
  ('contact-hours-heading', ARRAY['Business Hours'], NULL),
  
  ('contact-hours-details', ARRAY['Monday - Saturday: 8:00 AM - 5:00 PM', 'Sunday: Closed'], NULL)

ON CONFLICT ("contentId") 
DO UPDATE SET 
  text = EXCLUDED.text,
  image = EXCLUDED.image;

-- Confirm the data was inserted
SELECT COUNT(*) FROM "web-content"; 