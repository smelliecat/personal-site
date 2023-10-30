# #%%
# import re


# #%%
# def process_text_file(filename):
#     with open(filename, 'r') as f:
#         lines = f.readlines()
    
#     # Skipping the header
#     lines = lines[1:]
    
#     data = []
#     for line in lines:
#         parts = line.strip().split('\t')
#         data.append(parts)
    
#     unique_speakers = list({row[1] for row in data})
#     interviewer = unique_speakers[0]
    
#     combined_content = {}
#     current_speaker = None
#     current_content = ""
#     for row in data:
#         speaker = row[1]
#         content = row[3]
        
#         # Remove (pause *number*)
#         content = re.sub(r"\(pause [0-9.]*\)", "", content).strip()
        
#         # If speaker changes or it's the last row
#         if current_speaker and (current_speaker != speaker or row == data[-1]):
#             combined_content[current_speaker] = current_content
#             current_content = content
#         else:
#             current_content += " " + content
        
#         current_speaker = speaker
    
#     # Assigning the interviewer and interviewee
#     interviewer_content = combined_content[interviewer]
#     del combined_content[interviewer]
    
#     interviewee_content = " ".join(combined_content.values())
    
#     return interviewer, interviewer_content, interviewee_content

# #%%
# # Example usage:
# filename = "DCB_se3_ag4_m_01_1.txt"
# interviewer, interviewer_content, interviewee_content = process_text_file(filename)
# print(f"Interviewer: {interviewer}")
# print(f"Interviewer's Content: {interviewer_content}")
# print(f"Interviewee's Content: {interviewee_content}")

# # %%


#%%
import re

#%%
def process_text_file(filename):
    with open(filename, 'r') as f:
        lines = f.readlines()
    
    # Skipping the header
    lines = lines[1:]
    
    data = []
    for line in lines:
        parts = line.strip().split('\t')
        data.append(parts)
    
    print(data)
    unique_speakers = list({row[1] for row in data})
    interviewer = unique_speakers[0]
    
    combined_content = {}
    current_speaker = None
    current_content = []
    for row in data:
        speaker = row[1]
        content = row[3]
        # print(speaker)
        
        # Remove (pause *number*)
        content = re.sub(r"\(pause [0-9.]*\)", "", content).strip()
        
        if current_speaker and current_speaker != speaker:
            combined_content[current_speaker] = current_content
            current_content = [content]
        else:
            current_content.append(content)
        
        current_speaker = speaker
    
        combined_content[current_speaker] = current_content
    print(combined_content)
    
    output = ""
    for speaker, contents in combined_content.items():
        role = "interviewer" if speaker == interviewer else "interviewee"
        text = "\t".join(contents)
        output += f"{role}: {text}\n"
    
    return output

#%%
# Example usage:
filename = "DCB_se3_ag4_m_01_1.txt"
result = process_text_file(filename)
print(result)

# %%
