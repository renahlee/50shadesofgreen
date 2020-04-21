import { ModuleProps as TModule } from "../components/Module";

export const Conclusion: TModule = {
  heading: "Conclusion",
  sections: [
    {
      text: [
        "Our results confirm that target leakage of background pixels can artificially inflate the accuracy of a model trained on the raw data set. We used unsupervised hue-quantized image segmentation to quickly and effectively produce a data set of seedlings isolated from the background. We then independently trained our supervised learning models with the original data set and the segmented data to compare the results. Both the random forest model and the CNN achieved higher accuracy for the unsegmented images, likely due to consistent background information across the training set and the test set. The models trained with the segmented data set experienced a modest drop in accuracy for this test set, but we anticipate that these models are much better suited to generalize to real-world applications. New, varied test sets are needed to fully assess the CNN-based classifiers, but our results show that unsupervised segmentation is feasible and effective for ensuring a model extracts knowledge from relevant features."
      ]
    }
  ]
};
