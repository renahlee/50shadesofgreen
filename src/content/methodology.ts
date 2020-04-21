import { ModuleProps as TModule } from "../components/Module";

import Figure2_1 from "../static/Figure2_1.png";
import Figure2_2 from "../static/Figure2_2.png";
import Figure2_3 from "../static/Figure2_3.jpg";
import Figure2_4 from "../static/Figure2_4.png";
import Figure2_5 from "../static/Figure2_5.png";
import { worker } from "cluster";

export const Methodology: TModule = {
  heading: "Methodology",
  imagePrefix: "2",
  sections: [
    {
      text: [
        "For this project, we investigated both supervised and unsupervised learning techniques to support the classification of weeds and crops.",
        "## 🌱 Unsupervised segmentation",
        "To address target leakage in prior work, we employed unsupervised learning to segment the plant leaves from the background before training our supervised learners.  Without ground truth values for the plant body within the original dataset, our goals for unsupervised segmentation were to extract clear-enough leaves for passing to the supervised classifiers.",
        "As the target is fairly different from the background, clustering within color-space presented the most intuitive option. Since image color information is a bounded, continuous space, we decided that hard assignment along the color-information (and not spatial) axes would be sufficient and much more performant.  Therefore, we decided upon *k*-means clustering as our segmentation technique.  However, this posed three research questions:",
        "1. Which color space is best to quantize?\n" +
          "1. What is the optimal number of cluster centers to segment out the plant body?\n" +
          "1. How do we avoid mislabeling due to reflectance and illumination changes?",
        "For the first research question, we compared plant body segmentation for the quantization of all color channels within RGB-space to the hue channel within HSV-space. To do so, we used the elbow method \\[9\\] to generate a putative range of the number of clusters for each space, and then visually confirmed that segmentation would produce a cluster centroid corresponding to a plant body. Furthermore, we compared runtimes to determine which method was more performant, both in runtime and accuracy."
      ]
    },
    {
      image: Figure2_1,
      imageCaption: "HSV Space Cylinder",
      imageDescription: "The HSV model mapped to a cylinder.",
      imageWidth: "40%"
    },
    {
      image: Figure2_2,
      imageCaption: "RGB Space Cube",
      imageDescription: "The RGB model mapped to a cube.",
      imageWidth: "40%"
    },
    {
      text: [
        "In addition, there exists the need to automatically determine the optimal number of clusters upon which to quantize hue information in order to facilitate rapid segmentation.  To do so, we utilized the putative range of cluster numbers from the elbow method to calculate the average silhouette value for all clusters, retaining the number of clusters with the maximum average silhouette value.",
        "However, hue-quantization presents the additional challenge of illumination changes affecting diffuse reflection of green hues off of white surfaces (Figure 2.3).  To resolve this, we investigated two processes: (1) thresholding, which is a pre-process that removes all near-white pixels before segmentation, and (2) cascading segmentation, which implements two rounds of segmentation within alternating color spaces."
      ]
    },
    {
      image: Figure2_3,
      imageCaption: "Diffuse and Specular Reflection",
      imageDescription:
        "In HSV space, white surfaces can have a green hue with low saturation, particularly if the white surface is near a green plant body.",
      imageWidth: "60%"
    },
    {
      text: [
        "Once our images are pre-processed, we can implement *k*-means clustering upon just the relevant channels.  The resultant image can be processed with non-green suppression to extract the pixels corresponding to the plant body before passing the processed images to the supervised learners. In case multiple “green” hues are retained, we implemented two different methods:",
        "1. MaxGreen, which segments according to the most common green hue found in the image, **or**\n" +
          "1. AllGreen, which segments according to all possible green hues found as cluster centers."
      ]
    },
    {
      image: Figure2_4,
      imageCaption: "Unsupervised Segmentation Pipeline"
    },
    {
      text: [
        "## 🌱 Supervised classification",
        "Given labels for the input images, as well as segmented versions of the images, we wished to build classification models to distinguish both between weeds and crops.  We compared a random forest to a neural network, which we will describe below.",
        "### Random forest",
        "Since quickly training models is a desirable feature of the model, it is important to research the performance difference in classification between random forest and neural networks.  In the investigation, random forest models were created for both binary classification between weeds and crops, as well as classification between the comprehensive list of labels.  Since images were segmented through *k*-means, models were also trained on the segmented images.",
        "In order to train the random forest model, features need to be extracted that differentiate between images. Pixel color histograms were generated for the color images, as well as pixel intensities for grayscale images.  Bin values were then extracted as linear features.  In addition, multidimensional histograms using AND logic were created for the red, green, and blue-values as well:  One for all three together and two for red/green and blue/green.  For example, one bin would be for how many pixels have red, green and blue values between 0 and 10.",
        "### Neural network classifier",
        "We aim to develop a CNN image classifier that yields accurate results without a resource or time-intensive training process; all while dealing with the issues inherent in this dataset. To address the class imbalance, we create a balanced dataset by undersampling all classes down to 253 images per species. We create a training set and a testing set using an 80/20 split. We use 80% of the training set for training and 20% for validation. These splits yield 1948 training images, 488 validation images, and 600 testing images. To compensate for this relatively small dataset, we use the Xception model architecture \\[3\\] and use initial weights that have been trained on the ImageNet dataset\\[6\\]."
      ]
    },
    {
      image: Figure2_5,
      imageCaption: "Xception Model Architecture"
    },
    {
      text: [
        "The model was trained using the Adam optimizer with an initial learning rate of 0.0001 for 60 epochs. Training data was fed to the model in batches of 32 images. After each epoch, the validation accuracy was calculated. If the validation accuracy did not improve for three consecutive epochs, the learning rate was reduced by a factor of ⅕ with a minimum possible learning rate of 0.000001. If the validation accuracy did not improve for 10 consecutive epochs, training was ended and the model was saved with the weights that yielded the highest validation accuracy. This training procedure was repeated to train a model using the segmented images."
      ]
    }
  ]
};
