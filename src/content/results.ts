import { ModuleProps as TModule } from "../components/Module";
import Figure3_1 from "../static/Figure3_1.png";
import Figure3_2 from "../static/Figure3_2.png";
// import Figure3_3 from "../static/Figure3_3.png";
import Figure3_4 from "../static/Figure3_4.png";
// import Figure3_5 from "../static/Figure3_5.png";
import Figure3_6 from "../static/Figure3_6.png";
import Figure3_7 from "../static/Figure3_7.png";
import Figure3_8 from "../static/Figure3_8.png";
import Figure3_9 from "../static/Figure3_9.png";
import Figure3_10 from "../static/Figure3_10.png";
import Figure3_11 from "../static/Figure3_11.png";
import Figure3_12 from "../static/Figure3_12.png";
import Figure3_13 from "../static/Figure3_13.png";
import Figure3_14 from "../static/Figure3_14.png";
import Figure3_15 from "../static/Figure3_15.png";
import Figure3_16 from "../static/Figure3_16.png";
import Figure3_17 from "../static/Figure3_17.png";
import Figure3_18 from "../static/Figure3_18.png";
import Figure3_19 from "../static/Figure3_19.png";
import Figure3_20 from "../static/Figure3_20.png";
import Figure3_21 from "../static/Figure3_21.png";
import Figure3_23 from "../static/Figure3_23.png";
import Figure3_25 from "../static/Figure3_25.png";
import Figure3_27 from "../static/Figure3_27.png";
import Figure3_28 from "../static/Figure3_28.png";
import Figure3_29 from "../static/Figure3_29.png";
import Figure3_30 from "../static/Figure3_30.png";
import Figure3_31 from "../static/Figure3_31.png";
import Figure3_32 from "../static/Figure3_32.png";

export const Results: TModule = {
  heading: "Results and Analysis",
  sections: [
    {
      text: [
        "## 🌱 Unsupervised segmentation",
        "In general, unsupervised segmentation produced high-quality results.  In the following sections, we will go over the specific results of our experiments, as well as discuss our strategies for problematic outliers."
      ]
    },
    {
      image: Figure3_1,
      imageCaption: "12 Classes of Plants - Segmented Images",
      imageDescription:
        "Black-Grass, Charlock, Cleavers, Common Chickweed, Common Wheat, Fat Hen, Loose Silky-Bent, Maize, Scentless Mayweed, Shepherd’s Purse, Small-Flowered Cranesbill, Sugar Beet (left to right; top to bottom)",
      imageWidth: "60%"
    },
    {
      text: [
        "### RGB vs. HSV",
        "Initial naive clustering within RGB-space allowed for determining the optimal number of centers using the elbow method which resulted in a consistent range of cluster numbers k=[3,6] for all weeds and cash crops within the dataset."
      ]
    },
    {
      image: Figure3_2,
      imageCaption: "Elbow Method for RGB Quantization",
      imageDescription:
        "These representative results indicate an optimal *k*-value in the range [3,6].",
      imageWidth: "60%"
    },
    {
      image: "3",
      imageCaption: "Results of RGB Quantization",
      imageDescription:
        "The loss of the plant body and confusion with the background consistently occurs for plant bodies that are sparse"
    },
    {
      text: [
        "Similarly, applying the elbow method to hue-quantization within HSV-space produced the same optimal number of cluster centers as with RGB-space, but with much lower loss values."
      ]
    },
    {
      image: Figure3_4,
      imageCaption: "Elbow Method for Hue Quantization",
      imageDescription:
        "These representative results indicate an optimal k-value in the range [3,6].",
      imageWidth: "60%"
    },
    {
      image: "5",
      imageCaption: "Results of Hue Quantization",
      imageDescription:
        "The plant body is retained, as the hue information for the plant body is more likely to be a centroid for clustering.",
      imagePos: "left"
    },
    {
      image: Figure3_6,
      imageCaption: "RGB/HSV Time Ratio",
      imageDescription: "HSV quantization is multiple times faster.",
      imagePos: "left",
      imageWidth: "60%"
    },
    {
      text: [
        "Segmentation using the “optimal” k-range for RGB-quantization assigns the plant body to background centroids for images in which plant body pixels are sparse.  This is particularly egregious for “grass”-type plant bodies (See Figure 3.2).  However, hue-quantization doesn’t suffer from these issues (See Figure 3.3).  Therefore, we decided to primarily use hue-quantization moving forward.",
        "### Finding Optimal *k*",
        "In order to determine the best k-value for each image, we calculate the silhouette score of each pixel with respect to its cluster label and determine the average over all observations.  This was conducted with respect to the hue feature.  Then, we pick the number of clusters associated with the silhouette score closest to 1.  In Figures 3.6 and 3.7, we plot each observation’s silhouette value within its assigned cluster."
      ]
    },
    {
      image: Figure3_7,
      imageCaption: "Representative Weed (Black Grass)",
      imageDescription:
        "Silhouette analysis of the image indicates a sparse plant body within the image with a best k-value of 3.",
      imagePos: "left"
    },
    {
      image: Figure3_8,
      imageCaption: "Representative Crop (Maize)",
      imageDescription:
        "Silhouette analysis of the image indicates a sparse plant body within the image with a best k-value of 4."
    },
    {
      text: [
        "We can see that both the shape of the curve, as well as the average value, correspond to the quality of the cluster assignment. This process requires downsampling the image to reasonable observation size (n <= 10&#x2074;), but leads to reasonable performance prior to segmentation. We can qualitatively assess the validity of our cluster number determination with segmentation results implemented with non-green suppression.",
        "### Thresholding and cascaded segmentation",
        "With the initial set of results from k-means, segmented images had varying levels of background and noise present. Given that k-means converges toward local minima, we employ thresholding to mitigate potential assignment of white pixels as centers.",
        "Determined through tuning representative samples of 15 then 50 images, the white threshold values ranged from [120, 120, 120] to [180, 180, 180] and were suppressed as black pixels. Values chosen were largely influenced by illuminance, hue similarity between the background and leaves, and qualitative results from the representative samples. One might have assumed that the values were closer to [255, 255, 255] but as brightness is perceived in a relative fashion, the threshold optima point to underexposure or low light conditions."
      ]
    },
    {
      image: Figure3_9,
      imageCaption: "Sample (Black-grass)",
      imageDescription:
        "Original image, thresholding, initial k-means, k-means after thresholding (left to right)"
    },
    {
      text: [
        "As shown in Figure 3.8, thresholding effectively reduced problematic background pixels, particularly white pixels susceptible to adoption of hue characteristics via reflectance.",
        "### Problems"
      ]
    },
    {
      image: Figure3_10,
      imageCaption: "Background leakage due to hue similarity"
    },
    {
      image: Figure3_11,
      imageCaption:
        "Absence of plant pixels due to hue similarity; inaccurate plant pixel identification"
    },
    {
      text: [
        "Other negative factors stemmed from image conditions, such as low light, underexposure, and blurriness from misfocus or poor image quality. The former two led to image clipping (loss of detail) whereas the latter produced masks with ridged edges and opened models to misinterpretation of background pixels with plant-like hues as features."
      ]
    },
    {
      image: Figure3_12,
      imageCaption:
        "Sugar beet - clipping from low light/underexposure; loss of features from blurriness"
    },
    {
      image: Figure3_13,
      imageCaption: "Cleavers - ridged edges due to blurriness "
    },
    {
      image: Figure3_14,
      imageCaption: "Maize - ridged edges due to low light / low contrast"
    },
    {
      text: [
        "Considerations for improving segmentation results included normalizing image values and evaluating the ratio of plant to background pixels. However the inconsistency in image conditions and presence of features ultimately led to abandonment of these approaches."
      ]
    },
    {
      image: Figure3_15,
      imageCaption: "Maize - ridged edges due to low light / low contrast",
      imageDescription:
        "Blurry, zoomed-in, with container; blurry, zoomed-in, inter-plant occlusion;\nzoomed-out, dense foliage; blurry, zoomed-in"
    },
    {
      image: Figure3_16,
      imageCaption: "Black-grass - variance in image content and conditions",
      imageDescription:
        "Zoomed-out, with white ruler; blurry, zoomed-in;\nsparse plant pixels, with white ruler; blurry, zoomed-in"
    },
    {
      text: [
        "Similarly, an attempt to run images through two passes of k-means yielded mixed results. As shown in Figure 3.17 and 3.18, this approach proved capable of both successfully isolating plant pixels and faring worse than a single k-means pass without suppression."
      ]
    },
    {
      image: Figure3_17,
      imageCaption: "Cascading Segmentation: Black Grass",
      imageDescription:
        "Hue-quantization, followed by RGB-quantization successfully suppressed background."
    },
    {
      image: Figure3_18,
      imageCaption: "Cascading Segmentation: Cleavers",
      imageDescription:
        "Hue-quantization, followed by RGB-quantization produced holes."
    },
    {
      text: [
        "## 🌱 Supervised classification",
        "### Random forest results",
        "Feature creation results in 2688 bins, most of which will not provide any information for the model, requiring a reduction in feature space. The top 200 features are selected using the ANOVA F-value between the label and the feature for a classification task. Due to the features just being different bins in different histograms, it is hard to distinguish which 200 bins are used because the function does not return anything that is labeled. The model itself will also return values for the importance of features but due to not being able to keep track of which bins are being used this information is not valuable. It takes approximately 9.22 seconds to extract the features."
      ]
    },
    {
      image: Figure3_19,
      imageCaption: "Representative RGB Histogram",
      imageWidth: "60%"
    },
    {
      image: Figure3_20,
      imageCaption: "Representative Grayscale Histogram",
      imageWidth: "60%"
    },
    {
      text: [
        "For the normal images and the segmented images, there are 203 images from each class used in the training and 50 from each class used in the testing. For the crops and weeds classification there are 606 images in the crops training set, 630 in the weeds training set, 150 in the crops testing set, and 153 in the weeds testing set.",
        "In terms of the hyperparameters for the model, there are 100 trees in the forest, each with a max depth of 25.  The number of features at which to look when considering the best split is the square root of the total number of features. These parameters were chosen to generate the best results from the model.",
        "The model had an overall precision of 0.84. However there were some standout classes that had a very high precision. The model achieved a 0.96 precision for the common chickweed class and 0.93 for the Shepherd Purse class, with the lowest precision for the loose silky-bent class at 0.72. It takes approximately 1.31 seconds to train the model.",
        "In terms of time performance, the entire model takes about 1.31 seconds to train.  This is predominated by feature extraction time, which totaled 9.22 seconds over the entire domain of images."
      ]
    },
    {
      image: Figure3_21,
      imageCaption: "Random Forest (Unsegmented) Metrics"
    },
    {
      image: "22",
      imageCaption: "Random Forest (Unsegmented) Metrics"
    },
    {
      text: [
        "In contrast, training upon segmented images resulted in a lowered precision score: 0.77."
      ]
    },
    {
      image: Figure3_23,
      imageCaption: "Random Forest (Unsegmented) Metrics"
    },
    {
      image: "24",
      imageCaption: "Random Forest (Unsegmented) Metrics"
    },
    {
      text: [
        "Training a binary classifier to distinguish between weeds and crops yielded much higher precision and recall."
      ]
    },
    {
      image: Figure3_25,
      imageCaption: "Random Forest (Binary) Metrics"
    },
    {
      image: "26",
      imageCaption: "Random Forest (Binary) Confusion Matrix"
    },
    {
      text: [
        "### Neural network classifier",
        "For our neural network classifier, the changes in accuracy and loss over the training process for the unsegmented training and validation sets:"
      ]
    },
    {
      image: Figure3_27,
      imageCaption: "Neural Network (Unsegmented) Accuracy and Loss",
      imagePos: "right",
      imageWidth: "60%"
    },
    {
      text: [
        "The changes in accuracy and loss over the training process for the segmented training and validation sets:"
      ]
    },
    {
      image: Figure3_28,
      imageCaption: "Neural Network (Segmented) Accuracy and Loss",
      imagePos: "right",
      imageWidth: "60%"
    },
    {
      text: [
        "For both models, one epoch took about 63-37 seconds. Consequently, the unsegmented model trained for roughly 40 minutes and the segmented model trained for about 25 minutes. Test images took 366 ms to generate a prediction, so the 600 images in the test set were classified in 3 minutes, 40 seconds.",
        "The model trained on unsegmented images performed very well on the test set. An overall accuracy of 94.7% was achieved. The best classes, Charlock and Small-flowered Cranesbill were classified perfectly, with no false positives nor false negatives. The worst classes, Black-grass and Loose Silky-bent performed similarly with F1-scores of 0.752 and 0.768 respectively. The three cash crops all performed above average with Sugar Beet attaining an F1-score of 0.99."
      ]
    },
    {
      image: Figure3_29,
      imageCaption: "Neural Network (Unsegmented) Metrics"
    },
    {
      image: Figure3_30,
      imageCaption: "Neural Network (Unsegmented) Confusion Matrix"
    },
    {
      text: [
        "The model trained on segmented images also performed well on the test set, though not as well as the unsegmented model. An overall accuracy of 91.7% was achieved. Only Small-flowered Cranesbill was classified perfectly, with no false positives nor false negatives. Charlock achieved a perfect precision, but a single false negative led to a recall of 0.98. The worst classes were again Black-grass and Loose Silky-bent with F1-scores of 0.674 and 0.727 respectively. Black-grass suffered from an increase in false negatives while Loose Silky-bent had an increase in false positives. The three cash crops maintained their above average performance with Sugar Beet attaining the highest F1-score of 0.95."
      ]
    },
    {
      image: Figure3_31,
      imageCaption: "Neural network (Segmented) Metrics"
    },
    {
      image: Figure3_32,
      imageCaption: "Neural Network (Segmented) Confusion Matrix"
    }
  ]
};
