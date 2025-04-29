import { MapPin, Phone, Mail, Clock, Facebook, Twitter, Linkedin, Instagram } from "lucide-react"

export default function ContactInfo() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
        <p className="text-muted-foreground mb-8">
          Reach out to us for any inquiries about our automation solutions or to discuss your specific needs.
        </p>
      </div>

      <div className="space-y-6">
        <div className="flex items-start">
          <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center mr-4">
            <MapPin className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h3 className="font-semibold mb-1">Our Location</h3>
            <p className="text-muted-foreground">
              No 3 Akrvathi 3rd Block,
              <br />
              Dr.Shivaram Karanth Nagar,
              <br />
              Sampigehalli, Bengaluru, Karnataka 560077
            </p>
          </div>
        </div>

        <div className="flex items-start">
          <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center mr-4">
            <Phone className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h3 className="font-semibold mb-1">Phone</h3>
            <p className="text-muted-foreground">
              Main: +1 (555) 123-4567
              <br />
              Support: +1 (555) 987-6543
            </p>
          </div>
        </div>

        <div className="flex items-start">
          <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center mr-4">
            <Mail className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h3 className="font-semibold mb-1">Email</h3>
            <p className="text-muted-foreground">
              General: info@elextrioautomation.com
              <br />
              Support: support@elextrioautomation.com
            </p>
          </div>
        </div>

        <div className="flex items-start">
          <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center mr-4">
            <Clock className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h3 className="font-semibold mb-1">Business Hours</h3>
            <p className="text-muted-foreground">
              Monday - Friday: 8:00 AM - 5:00 PM
              <br />
              Saturday - Sunday: Closed
            </p>
          </div>
        </div>
      </div>

      <div>
        <h3 className="font-semibold mb-3">Connect With Us</h3>
        <div className="flex space-x-4">
          <a
            href="#"
            className="h-10 w-10 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-muted-foreground hover:text-primary transition-colors"
          >
            <Facebook className="h-5 w-5" />
          </a>
          <a
            href="#"
            className="h-10 w-10 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-muted-foreground hover:text-primary transition-colors"
          >
            <Twitter className="h-5 w-5" />
          </a>
          <a
            href="#"
            className="h-10 w-10 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-muted-foreground hover:text-primary transition-colors"
          >
            <Linkedin className="h-5 w-5" />
          </a>
          <a
            href="#"
            className="h-10 w-10 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-muted-foreground hover:text-primary transition-colors"
          >
            <Instagram className="h-5 w-5" />
          </a>
        </div>
      </div>
    </div>
  )
}
