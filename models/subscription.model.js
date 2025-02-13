import mongoose from "mongoose";

const subscriptionSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Subscription name is required"],
      trim: true,
      minLength: 2,
      maxLength: 100,
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
      min: [0, "Price must be greater than 0"],
    },
    curency: {
      type: String,
      enum: ["USD", "EUR", "BDT"],
      default: "BDT",
    },
    frequency: {
      type: String,
      enum: ["daily", "weekly", "monthly", "yearly"],
      default: "monthly",
    },
    category: {
      type: String,
      enum: [
        "sports",
        "news",
        "entertainment",
        "education",
        "technology",
        "health",
        "lifestyle",
        "business",
        "politics",
        "science",
        "others",
      ],
      required: [true, "Category is required"],
      default: "others",
    },
    paymentMethod: {
      type: String,
      enum: ["bkash", "nagad", "rocket", "card", "cash"],
      required: [true, "Payment method is required"],
      default: "cash",
    },
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },
    startDate: {
      type: Date,
      required: [true, "Start date is required"],
      validate: {
        validtor: (value) => value <= new Date(),
        message: "Start date must be less than or equal to current date",
      },
    },
    renewalDate: {
      type: Date,
      validate: {
        validator: function (value) {
          return value > this.startDate;
        },
        message: "Renewal date must be greater than or equal to start date",
      },
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
  },
  { timestamps: true }
);

//Auto calculate renewal date if missing
subscriptionSchema.pre("save", function (next) {
  if (!this.renewalDate) {
    const renewalPeriods = {
      daily: 1,
      weekly: 7,
      monthly: 30,
      yearly: 365,
    };

    this.renewalDate = new Date(this.startDate);
    this.renewalDate.setDate(
      this.renewalDate.getDate() + renewalPeriods[this.frequency]
    );
  }
  //Auto update the status if renewal date is passed
  if (this.renewalDate < new Date()) {
    this.status = "expired";
  }
  next();
});

const Subscription = mongoose.model("Subscription", subscriptionSchema);
export default Subscription;
