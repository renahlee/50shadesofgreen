import { ModuleProps as TModule } from "../components/Module";
import Figure3_15 from "../static/Figure3_15.png";

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
      image: "1",
      imageCaption: "12 Classes of Plants - Segmented Images",
      imageDescription:
        "Black-Grass, Charlock, Cleavers, Common Chickweed, Common Wheat, Fat Hen, Loose Silky-Bent, Maize, Scentless Mayweed, Shepherd’s Purse, Small-Flowered Cranesbill, Sugar Beet (left to right; top to bottom)",
      imagePos: "left"
    },
    {
      text: [
        "### RGB vs. HSV",
        "Initial naive clustering within RGB-space allowed for determining the optimal number of centers using the elbow method which resulted in a consistent range of cluster numbers k=[3,6] for all weeds and cash crops within the dataset."
      ]
    },
    {
      image: "2",
      imageCaption: "Elbow Method for RGB Quantization",
      imageDescription:
        "These representative results indicate an optimal *k*-value in the range [3,6].",
      imagePos: "left"
    },
    {
      image: "3",
      imageCaption: "Results of RGB Quantization",
      imageDescription:
        "The loss of the plant body and confusion with the background consistently occurs for plant bodies that are sparse",
      imagePos: "left"
    },
    {
      text: [
        "Similarly, applying the elbow method to hue-quantization within HSV-space produced the same optimal number of cluster centers as with RGB-space, but with much lower loss values."
      ]
    },
    {
      image: "4",
      imageCaption: "Elbow Method for Hue Quantization",
      imageDescription:
        "These representative results indicate an optimal k-value in the range [3,6].",
      imagePos: "left"
    },
    {
      image: "5",
      imageCaption: "Results of Hue Quantization",
      imageDescription:
        "The plant body is retained, as the hue information for the plant body is more likely to be a centroid for clustering.",
      imagePos: "left"
    },
    {
      image: "6",
      imageCaption: "RGB/HSV Time Ratio",
      imageDescription: "HSV quantization is multiple times faster.",
      imagePos: "left"
    },
    {
      text: [
        "Segmentation using the “optimal” k-range for RGB-quantization assigns the plant body to background centroids for images in which plant body pixels are sparse.  This is particularly egregious for “grass”-type plant bodies (See Figure 3.2).  However, hue-quantization doesn’t suffer from these issues (See Figure 3.3).  Therefore, we decided to primarily use hue-quantization moving forward.",
        "### Finding Optimal *k*",
        "In order to determine the best k-value for each image, we calculate the silhouette score of each pixel with respect to its cluster label and determine the average over all observations.  This was conducted with respect to the hue feature.  Then, we pick the number of clusters associated with the silhouette score closest to 1.  In Figures 3.6 and 3.7, we plot each observation’s silhouette value within its assigned cluster."
      ]
    },
    {
      image: "7",
      imageCaption: "Representative Weed (Black Grass)",
      imageDescription:
        "Silhouette analysis of the image indicates a sparse plant body within the image with a best k-value of 3.",
      imagePos: "left"
    },
    {
      image: "8",
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
      image: "9",
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
      image: "10",
      imageCaption: "Background leakage due to hue similarity"
    },
    {
      image: "11",
      imageCaption:
        "Absence of plant pixels due to hue similarity; inaccurate plant pixel identification"
    },
    {
      text: [
        "Other negative factors stemmed from image conditions, such as low light, underexposure, and blurriness from misfocus or poor image quality. The former two led to image clipping (loss of detail) whereas the latter produced masks with ridged edges and opened models to misinterpretation of background pixels with plant-like hues as features."
      ]
    },
    {
      image: "12",
      imageCaption:
        "Sugar beet - clipping from low light/underexposure; loss of features from blurriness"
    },
    {
      image: "13",
      imageCaption: "Cleavers - ridged edges due to blurriness "
    },
    {
      image: "14",
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
      image: "16",
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
      image: "17",
      imageCaption: "Cascading Segmentation: Black Grass",
      imageDescription:
        "Hue-quantization, followed by RGB-quantization successfully suppressed background."
    },
    {
      image: "18",
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
      image: "19",
      imageCaption: "Representative RGB Histogram"
    },
    {
      image: "20",
      imageCaption: "Representative Grayscale Histogram"
    }
  ]
};
